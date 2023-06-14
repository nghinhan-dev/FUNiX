const Book = require("../model/books");
const Cart = require("../model/cart");

exports.getSpecBook = (req, res, next) => {
  const reqID = req.params.bookId;

  Book.fetchBook(reqID, (book) => {
    res.send(book);
  });
};

exports.postToCart = (req, res, next) => {
  const newItem = {
    id: req.body.id,
    price: req.body.price,
  };

  Cart.addProduct(newItem.id, newItem.price);

  res.sendStatus(200);
};
