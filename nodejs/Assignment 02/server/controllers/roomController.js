const Room = require("../model/Room");

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
  const roomId = req.params.id;
  const updateData = req.body;

  const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, {
    new: true,
  });

  if (!updatedRoom) {
    return res.status(404).send({ statusText: "Room not found" });
  }

  res.status(200).send(updatedRoom);
};