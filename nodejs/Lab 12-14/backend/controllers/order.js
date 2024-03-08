const { createPdf } = require("../util/pdfCreate");
const Order = require("../model/order");
const Book = require("../model/books");

exports.postOrder = async (req, res, next) => {
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

    const order = new Order({
      items: items,
      user: req.user.userName,
      total: total,
    });

    createPdf(order);

    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await req.user.getOrder();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};
