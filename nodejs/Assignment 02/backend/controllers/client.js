const User = require("../model/User");
const Hotel = require("../model/Hotel");

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
