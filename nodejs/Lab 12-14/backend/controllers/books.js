const Book = require("../model/books");

exports.postBook = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const book = new Book(title, price, description, imageUrl);

  try {
    await book.save();
    res.status(200).json({ message: "Book saved successfully!" });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the book." });
  }
};

exports.getSpecBook = async (req, res, next) => {
  const reqID = req.params.bookId;

  try {
    const result = await Book.findById(reqID);

    res.status(200).send(result);
  } catch (error) {
    console.log("error:", error);
    res.status(404).json({ message: "Coundn't find requested book" });
  }
};

exports.updateBook = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const id = req.query.id;

  try {
    const updateBook = new Book(title, price, description, imageUrl, id);

    await updateBook.save();

    res.status(200).send("Updated!!");
  } catch (error) {
    console.log(error);
  }
};

exports.getBookList = async (req, res, next) => {
  try {
    const bookList = await Book.fetchAll();
    res.status(200).send(bookList);
  } catch (error) {
    console.log("error:", error);
    res.status(404).json({ message: "Book list not found" });
  }
};

// exports.postDelBook = async (req, res, next) => {
//   const id = req.query.id;

//   try {
//     await Book.destroy({
//       where: {
//         id: id,
//       },
//     });

//     res.status(200).send({ message: "Deletede Item" });
//   } catch (error) {
//     console.log("error:", error);
//   }
// };
