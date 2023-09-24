const TypeofRoom = require("../model/TypesofRoom");
const Room = require("../model/Room");

exports.getSpecificType = async (req, res) => {
  const id = req.params.id;

  const type = await TypeofRoom.findById(id);

  if (!type)
    return res
      .status(404)
      .send({ statusText: "Cannot find any type with given id" });

  res.status(200).send(type);
};

exports.getTypeRoom = async (req, res) => {
  try {
    const typeRooms = await TypeofRoom.find({});

    if (typeRooms.length === 0) {
      throw new Error("Cant fetch typeRooms database");
    }

    res.status(200).send(typeRooms);
  } catch (error) {
    console.log("error:", error);
    res.status(409).send(`${error}`);
  }
};

exports.updateRoom = async (req, res, next) => {
  const typeId = req.params.id;
  const updateData = {
    price: req.body.price,
    roomNums: req.body.roomNums,
    desc: req.body.desc,
    title: req.body.title,
    maxPeople: req.body.maxPeople,
  };

  const roomIds = await Promise.all(
    updateData.roomNums.split(",").map(async (numRoom) => {
      const newType = new Room({
        number: numRoom * 1,
        bookedRange: [],
      });
      await newType.save();

      return newType._id;
    })
  );

  updateData.roomNums = roomIds;

  const updatedType = await TypeofRoom.findByIdAndUpdate(typeId, updateData, {
    new: true,
  });

  if (!updatedType) {
    return res.status(404).send({ statusText: "Type room not found" });
  }

  res.status(200).send({ statusText: `Updated ${typeId}` });
};
