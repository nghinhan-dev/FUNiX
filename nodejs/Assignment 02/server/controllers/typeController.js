const TypeofRoom = require("../model/TypesofRoom");

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
