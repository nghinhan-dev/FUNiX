const Book = require("../model/books");
const Cart = require("../model/cart");

exports.postBook = (req, res, next) => {
  Book.create({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  })
    .then(() => {
      console.log("Added to book list");
      res.send({ message: "Added to server!" });
    })
    .catch((err) => console.log(err));
};

exports.updateBook = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const id = req.query.id;

  try {
    const updatedBook = await Book.findByPk(id);
    await updatedBook.set({ title, price, imageUrl, description });
    await updatedBook.save();

    res.status(200).send("Updated!!");
  } catch (error) {
    console.log(error);
  }
};

exports.getBookList = (req, res, next) => {
  Book.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll((cart) => {
    res.send(cart);
  });
};

exports.postDelBook = async (req, res, next) => {
  const id = req.query.id;
  console.log("id:", id);

  try {
    await Book.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Deletede Item" });
  } catch (error) {
    console.log("error:", error);
  }
};
