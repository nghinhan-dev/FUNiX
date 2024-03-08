const Book = require("../model/books");

exports.getCart = async (req, res) => {
  try {
    const cartItems = req.user.cart.items;

    const items = await Promise.all(
      cartItems.map(async (prd) => {
        return { ...(await Book.findById(prd.id)), quantity: prd.quantity };
      })
    );

    let total = items.reduce((acc, item) => {
      return acc + item.price * 1 * item.quantity * 1;
    }, 0);

    res.status(200).send({ items: items, total: total });
  } catch (error) {
    next(error);
  }
};

exports.postToCart = async (req, res, next) => {
  const prdId = req.body.id;

  try {
    const addedItem = await Book.findById(prdId);
    await req.user.addToCart(addedItem);

    res.status(200).send(req.user.cart);
  } catch (error) {
    next(error);
  }
};

exports.delFromCart = async (req, res, next) => {
  const delItemId = req.body.id;
  try {
    await req.user.delFromCart(delItemId);
    res.status(200).send({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};
