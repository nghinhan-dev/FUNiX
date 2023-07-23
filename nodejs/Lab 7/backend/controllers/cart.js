const Cart = require("../model/cart");

exports.getCart = (req, res, next) => {
  Cart.fetchAll((cart) => {
    res.send(cart);
  });
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
