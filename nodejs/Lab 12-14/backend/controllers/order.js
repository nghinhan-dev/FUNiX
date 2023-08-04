exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrder();

    res.status(200).send({ message: "Created Order" });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await req.user.getOrder();
    res.status(200).send(orders);
  } catch (error) {
    console.log("error:", error);
  }
};
