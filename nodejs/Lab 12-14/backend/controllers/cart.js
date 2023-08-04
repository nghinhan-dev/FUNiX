const Book = require("../model/books");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();

    res.send(cart);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.postToCart = async (req, res, next) => {
  const prdId = req.body.id;

  try {
    const addedItem = await Book.findById(prdId);
    await req.user.addToCart(addedItem);

    res.sendStatus(200);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.delFromCart = async (req, res, next) => {
  const delItemId = req.body.id;
  try {
    await req.user.delFromCart(delItemId);
    res.sendStatus(200);
  } catch (error) {
    console.log("error:", error);
  }
};
