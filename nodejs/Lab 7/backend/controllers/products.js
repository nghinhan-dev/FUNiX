const Book = require("../model/books");

exports.postNewBook = (req, res, next) => {
  const newBook = new Book(
    req.body.id,
    req.body.title,
    req.body.price,
    "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    req.body.desc
  );
  newBook.save();
  res.sendStatus(200);
};

exports.getBookList = (req, res, next) => {
  Book.fetchAll((bookList) => {
    res.send(bookList);
  });
};
