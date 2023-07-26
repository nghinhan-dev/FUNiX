const Cart = require("../model/cart");
const Book = require("../model/books");
const User = require("../model/user");

exports.getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products = await cart.getBooks();

  res.send(products);
};

exports.postToCart = async (req, res, next) => {
  const user = req.user;
  const prodId = req.body.id;
  const cart = await user.getCart();
  const products = await cart.getBooks({ where: { id: prodId } });
  let product;
  let newQuantity = 1;

  if (products.length > 0) {
    product = products[0];
  }

  if (product) {
    const oldQuantity = product.cartItem.quantity;
    newQuantity = oldQuantity + 1;
  }

  const addProd = await Book.findByPk(prodId);
  await cart.addBook(addProd, { through: { quantity: newQuantity } });
  await user.addBook(addProd);

  res.sendStatus(200);
};

exports.delFromCart = async (req, res, next) => {
  const delItemId = req.body.id;
  const cart = await req.user.getCart();
  const products = await cart.getBooks({ where: { id: delItemId } });

  const product = products[0];
  await product.cartItem.destroy();

  res.sendStatus(200);
};
