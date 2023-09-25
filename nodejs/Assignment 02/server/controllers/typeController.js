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
    price: req.body.price * 1,
    roomNums: req.body.roomNums,
    desc: req.body.desc,
    title: req.body.title,
    maxPeople: req.body.maxPeople * 1,
  };

  try {
    const roomIds = await Promise.all(
      updateData.roomNums.split(",").map(async (numRoom) => {
        const newType = new Room({
          number: numRoom * 1,
          bookedRange: [],
        });
        await newType.save();

        return newType._id.toString();
      })
    );

    updateData.roomNums = roomIds;

    const updatedType = await TypeofRoom.findByIdAndUpdate(
      typeId,
      {
        price: updateData.price,
        roomNums: updateData.roomNums,
        desc: updateData.desc,
        title: updateData.title,
        maxPeople: updateData.maxPeople,
      },
      {
        new: true,
      }
    );

    if (!updatedType) {
      return res.status(404).send({ statusText: "Type room not found" });
    }

    res.status(200).send({ statusText: `Updated ${typeId}` });
  } catch (error) {
    console.error("Error:", error);

    // Send an error response in the catch block
    res.status(500).send({ statusText: "Internal server error" });
  }
};

exports.addRoom = async (req, res, next) => {
  const newTypeData = {
    price: req.body.price * 1,
    roomNums: req.body.roomNums,
    desc: req.body.desc,
    title: req.body.title,
    maxPeople: req.body.maxPeople * 1,
  };

  try {
    const roomIds = await Promise.all(
      newTypeData.roomNums.split(",").map(async (numRoom) => {
        const newType = new Room({
          number: numRoom * 1,
          bookedRange: [],
        });
        await newType.save();

        return newType._id.toString();
      })
    );

    newTypeData.roomNums = roomIds;

    const newType = new TypeofRoom(newTypeData);

    if (!newType) {
      return res.status(404).send({ statusText: "Type room not found" });
    }

    res.status(200).send({ statusText: "Create new type successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ statusText: "Internal server error" });
  }
};
