const Room = require("../model/Room");
const TypeofRoom = require("../model/TypesofRoom");
const { parseDate } = require("../util/timeZone");

exports.getRoom = async (req, res) => {
  try {
    const rooms = await Room.find({});

    if (rooms.length === 0) {
      throw new Error("Cant fetch rooms database");
    }

    res.status(200).send(rooms);
  } catch (error) {
    console.log("error:", error);
    res.status(409).send(`${error}`);
  }
};

exports.getSpecificRoom = async (req, res) => {
  const id = req.params.id;

  const room = await Room.findById(id);

  if (!room) {
    return res
      .status(404)
      .send({ statusText: "Cannot find any room with given id" });
  }

  res.status(200).send(room);
};

exports.addRoom = async (req, res) => {
  try {
    const bookedRange = JSON.parse(req.body.dateRange);

    const newRoom = new Room({
      number: req.body.number,
      bookedRange: bookedRange.map((range) => ({
        startDate: new Date(range.startDate),
        endDate: new Date(range.endDate),
      })),
    });

    await newRoom.save();

    res.status(200).send({ statusText: "Successfully create new room" });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.updateRoom = async (req, res) => {
  const roomId = req.params.roomId;
  const updateData = req.body;

  const updateRoom = await Room.findById(roomId);

  if (updateRoom.number !== updateData.number) {
    updateRoom.number = updateData.number;
  }

  if (updateData.dateRange !== JSON.stringify(updateRoom.bookedRange)) {
    updateRoom.bookedRange = [];
    const bookedRange = JSON.parse(updateData.dateRange);

    for (const range of bookedRange) {
      updateRoom.bookedRange.push({
        startDate: parseDate(range.startDate),
        endDate: parseDate(range.endDate),
      });
    }
  }

  await updateRoom.save();

  if (!updateRoom) {
    return res.status(404).send({ statusText: "Room not found" });
  }

  res.status(200).send({ statusText: "Successfully update room" });
};

exports.delRoom = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const [type] = await TypeofRoom.find({ roomIds: roomId });
    const newRoomIds = type.roomIds.filter((id) => id !== roomId);

    type.roomIds = newRoomIds;
    type.save();

    const response = await Room.findByIdAndDelete(id);

    if (!response) {
      console.log(response);
      throw new Error("Cannot delete");
    }

    res.status(200).send({ statusText: "Deleted" });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ statusText: "Server error" });
  }
};
