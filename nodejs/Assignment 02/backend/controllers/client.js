const User = require("../model/User");
const Hotel = require("../model/Hotel");
const TypeofRoom = require("../model/TypesofRoom");
const Room = require("../model/Room");
const { Types } = require("mongoose");

exports.loginUser = async (req, res, next) => {
  try {
    const users = await User.find({
      username: req.body.username,
      password: req.body.password,
    }).exec();

    if (users.length === 0) {
      throw new Error("Cannot find account");
    }

    res.status(200).send(users[0]);
  } catch (error) {
    console.log("error:", error);
    res.status(404).send(`${error}`);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const users = await User.find({
      username: req.body.username,
    });

    console.log("users:", users);
    if (users.length !== 0) {
      throw new Error("Account already existed!");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: `${req.body.username}@gmail.com`,
    });

    await newUser.save();

    res.status(200).send("Successfully created!");
  } catch (error) {
    console.log("error:", error);
    res.status(409).send(`${error}`);
  }
};

exports.hotelDB = async (req, res, next) => {
  let cityResult = {
    HaNoi: 0,
    HoChiMinh: 0,
    DaNang: 0,
  };
  let byPropertyResult = {
    hotel: 0,
    aparments: 0,
    resorts: 0,
    villas: 0,
    cabins: 0,
  };
  let highestRatingResult = [];
  try {
    const hotels = await Hotel.find();

    hotels.forEach((hotel) => {
      // get how many hotel in each city
      switch (hotel.city) {
        case "Ha Noi":
          cityResult = { ...cityResult, HaNoi: cityResult.HaNoi + 1 };
          break;

        case "Ho Chi Minh":
          cityResult = { ...cityResult, HoChiMinh: cityResult.HoChiMinh + 1 };
          break;
        case "Da Nang":
          cityResult = { ...cityResult, DaNang: cityResult.DaNang + 1 };
          break;
        default:
          break;
      }

      // get how many property based by type
      switch (hotel.type[0]) {
        case "hotel": {
          byPropertyResult = {
            ...byPropertyResult,
            hotel: byPropertyResult.hotel + 1,
          };
          break;
        }
        case "aparment": {
          byPropertyResult = {
            ...byPropertyResult,
            aparments: byPropertyResult.aparments + 1,
          };
          break;
        }
        case "resort":
          byPropertyResult = {
            ...byPropertyResult,
            resorts: byPropertyResult.resorts + 1,
          };
          break;
        case "villa":
          byPropertyResult = {
            ...byPropertyResult,
            villas: byPropertyResult.villas + 1,
          };
          break;
        case "cabin":
          byPropertyResult = {
            ...byPropertyResult,
            cabins: byPropertyResult.cabins + 1,
          };
          break;

        default:
          break;
      }

      // get 3 highest rating result
    });
    highestRatingResult = await Hotel.find()
      .sort({ rating: -1 })
      .limit(3)
      .exec();

    res.status(200).send({ cityResult, byPropertyResult, highestRatingResult });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.search = async (req, res, next) => {
  const formData = {
    maxPeople:
      req.body.adult && req.body.child
        ? req.body.adult * 1 + req.body.child * 1
        : 0,
    city: req.body.city,
    room: req.body.room ? req.body.room : 0,
    startDate: req.body.startDate ? req.body.startDate : 0,
    endDate: req.body.endDate ? req.body.endDate : 0,
  };

  try {
    // get hotel has matching city
    const hotels = await Hotel.find({ city: formData.city }).exec();

    if (hotels.length === 0) {
      throw new Error("Cannot find any hotel in given city");
    }

    const typeofRoomIdListArr = hotels
      .map((hotel) => {
        return hotel.rooms;
      })
      .flat();

    const typeofRoomArrPromises = typeofRoomIdListArr.map(async (roomId) => {
      return await TypeofRoom.findById(new Types.ObjectId(roomId)).gt(
        "maxPeople",
        formData.maxPeople - 1
      );
    });

    const resolvedTypeofRoomArr = await Promise.all(typeofRoomArrPromises);

    const typeofRoomArr = resolvedTypeofRoomArr.filter((room) => room !== null);

    if (typeofRoomArr.length === 0) {
      throw new Error("Cannot find any hotel in required people capacity");
    }

    const roomIdListArr = typeofRoomArr
      .map((hotel) => {
        return hotel.rooms;
      })
      .flat();

    const roomArrPromises = roomIdListArr.map(async (roomId) => {
      return await Room.findById(new Types.ObjectId(roomId));
    });

    const resolvedRoomArr = await Promise.all(roomArrPromises);

    const roomArr = resolvedRoomArr.filter((room) => room !== null);

    if (roomArr.length === 0) {
      throw new Error("Cannot find any hotel in required people capacity");
    }

    const availableRoomArr = getAvailableRoom(
      roomArr,
      formData.startDate,
      formData.endDate
    );

    if (availableRoomArr.length === 0) {
      throw new Error(
        "We're so sorry, there aren't any room meet your request!"
      );
    }

    const validRoomIds = availableRoomArr.map((room) => {
      return new Types.ObjectId(room._id);
    });

    const result = await Room.aggregate([
      {
        $match: {
          _id: {
            $in: validRoomIds,
          },
        },
      },
      {
        $lookup: {
          from: "typeofrooms",
          let: { roomId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [{ $toString: "$$roomId" }, "$rooms"],
                },
              },
            },
          ],
          as: "roomDetails",
        },
      },
      {
        $lookup: {
          from: "hotels", // Update to your Hotel model name
          let: {
            roomDetailsId: {
              $first: "$roomDetails._id",
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    {
                      $toString: "$$roomDetailsId",
                    },
                    "$rooms",
                  ],
                },
              },
            },
          ],
          as: "hotel",
        },
      },
    ]);

    res.status(200).send(result);
  } catch (error) {
    console.log("error:", error);
    res.status(404).send(`${error}`);
  }
};

function getAvailableRoom(roomArr, startDate, endDate) {
  const reqStartDate = new Date(startDate);
  const reqEndDate = new Date(endDate);

  const result = [];
  for (let i = 0; i < roomArr.length; i++) {
    const validStartDate = roomArr[i].bookedRange.findIndex((range) => {
      const bookedEndDate = new Date(range.endDate);
      return bookedEndDate < reqStartDate;
    });
    const validEndDate = roomArr[i].bookedRange.findIndex((range) => {
      const bookedStartDate = new Date(range.startDate);
      return bookedStartDate < reqEndDate;
    });

    if (validStartDate !== -1 && validEndDate !== -1) {
      result.push(roomArr[i]);
    }
  }

  return result;
}
