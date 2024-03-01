const TypeofRoom = require("../model/TypesofRoom");
const Room = require("../model/Room");
const Hotel = require("../model/Hotel");
const { ObjectId } = require("mongodb");
const { isWithinInterval, isBefore } = require("date-fns");

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
    const updateType = await TypeofRoom.findById(typeId);
    if (req.body.rooms) {
      const newRoomsArr = req.body.rooms.split(",");

      const [{ roomNums, roomIds }] = await TypeofRoom.aggregate([
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
            as: "roomNums",
          },
        },
        {
          $project: {
            _id: 0,
            roomNums: {
              $map: {
                input: "$roomNums",
                as: "room",
                in: "$$room.number",
              },
            },
            roomIds: 1,
          },
        },
      ]);

      for (const number of newRoomsArr) {
        if (!roomNums.includes(number * 1)) {
          const newRoom = new Room({
            number: number * 1,
          });

          await newRoom.save();

          roomIds.push(newRoom._id);
        }
      }

      updateType.set({ ...updateData, roomIds: roomIds });
    }

    updateType.set({ ...updateData });

    await updateType.save();

    if (!updateType) {
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
    roomNums: req.body.roomNums.split(","),
    desc: req.body.desc,
    title: req.body.title,
    maxPeople: req.body.maxPeople * 1,
  };

  try {
    const roomIds = [];

    for (const number of newTypeData.roomNums) {
      const newRoom = new Room({
        number: number * 1,
      });

      await newRoom.save();

      roomIds.push(newRoom._id);
    }

    newTypeData.roomIds = roomIds;

    const newType = new TypeofRoom(newTypeData);

    await newType.save();

    if (!newType) {
      return res.status(404).send({ statusText: "Type room not found" });
    }

    res.status(200).send({ statusText: "Create new type successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ statusText: "Internal server error" });
  }
};

exports.deType = async (req, res) => {
  const typeID = req.params.typeID;
  try {
    const type = await TypeofRoom.findById(typeID);

    let bookedRoom = [];
    if (type.roomIds.length !== 0) {
      await Promise.all(
        type.roomIds.map(async (id) => {
          const room = await Room.findById(id);

          if (room.bookedRange.length === 0) return;

          room.bookedRange.map((range) => {
            let isWithin = isWithinInterval(new Date(), {
              start: range.startDate,
              end: range.endDate,
            });

            let isBeforeBooked = isBefore(new Date(), range.startDate);

            if (isWithin || isBeforeBooked) bookedRoom.push(room);
          });
        })
      );
    }

    if (bookedRoom.length !== 0) {
      return res.status(400).send({
        error: "Room type has associated transactions",
        message: "Cannot delete hotel",
        bookedRoom: bookedRoom,
      });
    }

    // const [hotel] = await Hotel.find({ typeIds: typeID });
    // const newTypeIds = hotel.typeIds.filter((id) => id !== typeID);

    // hotel.roomIds = newTypeIds;
    // hotel.save();

    // await TypeofRoom.findByIdAndDelete(typeID);

    res.status(200).send({ bookedRoom: bookedRoom });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ statusText: "Server error" });
  }
};
