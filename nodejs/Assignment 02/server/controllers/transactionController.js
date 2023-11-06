const Transaction = require("../model/Transaction");
const Hotel = require("../model/Hotel");
const Room = require("../model/Room");

exports.booking = async (req, res) => {
  // console.log("Is booking");
  const { user, hotel, roomIds, dateStart, dateEnd, total, payment } = req.body;

  try {
    const reqHotel = await Hotel.find({ name: hotel });
    if (reqHotel.length === 0) {
      throw new Error("Cannot find given hotel");
    }

    const newTrans = new Transaction({
      user: user,
      hotel: hotel,
      roomIds: roomIds.split(","),
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
      total: total,
      payment: payment,
      status: "Booked",
    });

    for (const roomId of newTrans.roomIds) {
      const room = await Room.findById(roomId);
      room.bookedRange = [
        ...room.bookedRange,
        {
          startDate: newTrans.dateStart,
          endDate: newTrans.dateEnd,
        },
      ];

      await room.save();
    }

    await newTrans.save();

    res.status(200).send("Booked");
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

exports.getTrans = async (req, res) => {
  try {
    // const trans = await Transaction.find({});
    const trans = await Transaction.aggregate([
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
          roomNums: {
            $map: {
              input: "$roomNums",
              as: "room",
              in: "$$room.number",
            },
          },
          dateStart: 1,
          dateEnd: 1,
          user: 1,
          hotel: 1,
          total: 1,
          payment: 1,
          status: 1,
        },
      },
    ]);

    if (trans.length === 0) {
      throw new Error("Cant fetch hotel database");
    }

    res.status(200).send(trans);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

exports.getUserTrans = async (req, res) => {
  const username = req.params.username;

  try {
    const trans = await Transaction.aggregate([
      {
        $match: {
          user: username,
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
          as: "roomsNum",
        },
      },
      {
        $project: {
          roomNums: {
            $map: {
              input: "$roomsNum",
              as: "room",
              in: "$$room.number",
            },
          },
          dateStart: 1,
          dateEnd: 1,
          user: 1,
          hotel: 1,
          total: 1,
          payment: 1,
          status: 1,
        },
      },
    ]);

    if (trans.length === 0) {
      throw new Error("Cant fetch hotel database");
    }

    res.status(200).send(trans);
  } catch (error) {
    res.status(404).send(`${error.message}`);
  }
};
