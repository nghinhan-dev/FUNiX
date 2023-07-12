const Book = require("../model/books");
const Cart = require("../model/cart");

exports.getSpecBook = (req, res, next) => {
  const reqID = req.params.bookId;

  Book.findByPk(reqID)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.postToCart = (req, res, next) => {
  const newItem = {
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
  };

  Cart.addProduct(newItem.id, newItem.title, newItem.price);

  res.sendStatus(200);
};

exports.delFromCart = (req, res, next) => {
  const delItem = {
    id: req.body.id,
    price: req.body.price,
  };

  Cart.deleteProduct(delItem.id, delItem.price);

  res.sendStatus(200);
};
