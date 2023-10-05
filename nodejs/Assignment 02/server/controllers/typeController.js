const TypeofRoom = require("../model/TypesofRoom");
const Room = require("../model/Room");
const { isValidObjectId } = require("../middleware/validate-fnc");
const { ObjectId } = require("mongodb");

exports.getSpecificType = async (req, res) => {
  const typeId = req.params.id;

  const type = await TypeofRoom.aggregate([
    {
      $match: {
        _id: new ObjectId(typeId),
      },
    },
    {
      $lookup: {
        from: "rooms",
        let: { roomIds: "$roomIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [{ $toString: "$_id" }, "$$roomIds"],
              },
            },
          },
        ],
        as: "rooms",
      },
    },
    {
      $project: {
        _id: 1,
        desc: 1,
        maxPeople: 1,
        price: 1,
        title: 1,
        rooms: 1,
      },
    },
  ]);

  if (!type)
    return res
      .status(404)
      .send({ statusText: "Cannot find any type with given id" });

  res.status(200).send(type[0]);
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

exports.updateType = async (req, res) => {
  const typeId = req.params.id;

  const updateData = {
    price: req.body.price * 1,
    desc: req.body.desc,
    title: req.body.title,
    maxPeople: req.body.maxPeople * 1,
  };

  try {
    const updatedType = await TypeofRoom.findByIdAndUpdate(
      typeId,
      {
        price: updateData.price,
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

exports.addType = async (req, res) => {
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
        if (isValidObjectId(numRoom)) {
          const newRoom = await Room.findById(numRoom);

          console.log(newRoom);
          return newRoom._id.toString();
        }

        const newRoom = new Room({
          number: numRoom * 1,
          bookedRange: [],
        });
        await newRoom.save();

        return newRoom._id.toString();
      })
    );

    newTypeData.roomNums = roomIds;

    const newType = new TypeofRoom(newTypeData);

    await newType.save();
    console.log("newType:", newType);

    if (!newType) {
      return res.status(404).send({ statusText: "Type room not found" });
    }

    res.status(200).send({ statusText: "Create new type successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ statusText: "Internal server error" });
  }
};
