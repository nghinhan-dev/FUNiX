const fs = require("fs");
const path = require("path");

const mainModulePath = require.main.filename;
const p = path.join(path.dirname(mainModulePath), "data", "products.json");

module.exports = class Book {
  constructor(_id, _title, _price, _imageUrl, _desc) {
    this.id = _id;
    this.title = _title;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.desc = _desc;
  }

  save(id) {
    fs.readFile(p, (err, fileContent) => {
      let bookList = [];
      if (!err) {
        bookList = JSON.parse(fileContent);
      }

      const isExistedIndex = bookList.findIndex((book) => book.id === id);
      if (isExistedIndex !== -1) {
        let updatedBook = this;
        bookList[isExistedIndex] = updatedBook;
      } else {
        bookList.push(this);
      }

      fs.writeFile(p, JSON.stringify(bookList), (err) => {
        console.log("error", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }

  static fetchBook(id, callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        const bookList = JSON.parse(fileContent);
        const resBook = bookList.find((b) => b.id === id);
        callback(resBook);
      }
    });
  }
};
