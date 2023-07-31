const OrderItem = require("../model/order-item");

exports.postOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await user.getCart();
    const books = await cart.getBooks({
      include: [{ model: OrderItem, as: "orderItem" }],
    });

    if (books.length > 0) {
      const order = await user.createOrder();
      order.addBooks(
        books.map((book) => {
          console.log("orderItem", book.orderItem);
          book.orderItem = { quantity: book.cartItem.quantity };
        })
      );
    }

    res.status(200).send({ message: "Created Order" });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getOrder = async (req, res, next) => {};
