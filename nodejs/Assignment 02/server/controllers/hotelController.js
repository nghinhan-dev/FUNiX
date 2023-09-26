const Hotel = require("../model/Hotel");
const TypeofRoom = require("../model/TypesofRoom");

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find({});

    if (hotel.length === 0) {
      throw new Error("Cant fetch hotel database");
    }

    res.status(200).send(hotel);
  } catch (error) {
    res.status(409).send(`${error}`);
  }
};

exports.getSpecificHotel = async (req, res) => {
  const id = req.params.id;

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    return res
      .status(404)
      .send({ statusText: "Cannot find any hotel with given id" });
  }

  res.status(200).send(hotel);
};

exports.overallHotel = async (req, res) => {
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

exports.search = async (req, res) => {
  let adult = req.body.adult === undefined ? 0 : +req.body.adult;
  let child = req.body.child === undefined ? 0 : +req.body.child;

  const formData = {
    maxPeople: adult + child,
    city: req.body.city === undefined ? "" : req.body.city,
    room: req.body.room ? req.body.room : 0,
    startDate: req.body.startDate ? req.body.startDate : 0,
    endDate: req.body.endDate ? req.body.endDate : 0,
  };

  try {
    // get hotel has matching city

    const hotels = await Hotel.aggregate([
      { $match: { city: formData.city } },
      {
        $lookup: {
          from: "typeofrooms",
          let: { typeIds: "$typeIds" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: [formData.maxPeople, "$maxPeople"] },
                    {
                      $in: [{ $toString: "$_id" }, "$$typeIds"],
                    },
                  ],
                },
              },
            },
          ],
          as: "roomsType", // roomsType : [] bi. loai.
        },
      },
      {
        $match: { roomsType: { $ne: [] } },
      },
      {
        $lookup: {
          from: "rooms",
          let: {
            roomIds: {
              $first: "$roomsType.roomIds",
            },
            givenStartDate: new Date(formData.startDate), // Replace with your given start date
            givenEndDate: new Date(formData.endDate), // Replace with your given end date
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $in: [{ $toString: "$_id" }, "$$roomIds"],
                    },
                    {
                      $not: {
                        $anyElementTrue: {
                          $map: {
                            input: "$bookedRange",
                            as: "range",
                            in: {
                              $and: [
                                {
                                  $lt: ["$$givenStartDate", "$$range.endDate"],
                                },
                                {
                                  $gt: ["$$givenEndDate", "$$range.startDate"],
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "availableRoom",
        },
      },
      {
        $match: { availableRoom: { $ne: [] } },
      },
    ]);

    res.status(200).send(hotels);
  } catch (error) {
    console.log("error dude:", error);
    res.send(`${error}`);
  }
};

exports.addHotel = async (req, res) => {
  const {
    address,
    cheapestPrice,
    city,
    desc,
    distance,
    featured,
    name,
    photos,
    rooms,
    title,
    type,
    rating,
  } = req.body;

  const typeofRoomIds = await Promise.all(
    rooms.split(",").map(async (title) => {
      const newType = new TypeofRoom({
        title: title,
        desc: "",
        maxPeople: 0,
        price: 0,
      });
      await newType.save();
      return newType._id;
    })
  );

  const newHotel = new Hotel({
    address: address,
    cheapestPrice: cheapestPrice,
    city: city,
    desc: desc,
    distance: distance,
    featured: featured === "true" || featured ? true : false,
    name: name,
    photos: photos.split(","),
    rooms: typeofRoomIds,
    title: title,
    type: type.split(","),
    rating: rating,
  });

  await newHotel.save();

  res.status(200).send({ statusText: "Create new hotel successfully" });
};

exports.updateHotel = async (req, res) => {
  const id = req.params.id;
  const {
    address,
    cheapestPrice,
    city,
    desc,
    distance,
    featured,
    name,
    photos,
    rooms,
    title,
    type,
    rating,
  } = req.body;

  try {
    const updateData = {
      address: address,
      cheapestPrice: cheapestPrice * 1,
      city: city,
      desc: desc,
      distance: distance * 1,
      featured: featured === "true" || featured ? true : false,
      name: name,
      photos: photos.split(","),
      rooms: rooms.split(","),
      title: title,
      type: type.split(","),
      rating: rating * 1,
    };

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedHotel) {
      return res.status(404).send({ statusText: "User not found" });
    }

    res.status(200).send(updatedHotel);
  } catch (error) {
    console.log("error:", error);
    res.status(404).send(error);
  }
};

exports.delHotel = async (req, res) => {
  const id = req.params.hotelId;

  try {
    const response = await Hotel.findByIdAndDelete(id);

    if (!response) {
      console.log(response);
      throw new Error("Cannot delete");
    }

    res.status(200).send({ statusText: "Deleted" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ statusText: "Server error" });
  }
};
