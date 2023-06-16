const Book = require("../model/books");
const Cart = require("../model/cart");

exports.postBook = (req, res, next) => {
  const newBook = new Book(
    req.body.id,
    req.body.title,
    req.body.price,
    "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    req.body.desc
  );
  newBook.save(newBook.id);
  res.sendStatus(200);
};

exports.getBookList = (req, res, next) => {
  Book.fetchAll((bookList) => {
    res.send(bookList);
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll((cart) => {
    res.send(cart);
  });
};
