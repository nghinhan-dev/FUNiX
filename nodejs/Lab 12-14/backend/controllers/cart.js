const Book = require("../model/books");

exports.getCart = async (req, res) => {
  try {
    const cartItems = req.user.cart.items;

    const result = await Promise.all(
      cartItems.map(async (prd) => {
        return { ...(await Book.findById(prd.id)), quantity: prd.quantity };
      })
    );

    res.status(200).send(result);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.postToCart = async (req, res, next) => {
  const prdId = req.body.id;

  try {
    const addedItem = await Book.findById(prdId);
    await req.user.addToCart(addedItem);

    res.status(200).send(req.user.cart);
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
