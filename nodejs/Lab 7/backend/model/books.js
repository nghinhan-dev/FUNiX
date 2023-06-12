const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

module.exports = class Book {
  constructor(_title, _price, _imageUrl, _desc) {
    this.title = _title;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.desc = _desc;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let bookList = [];
      if (!err) {
        bookList = JSON.parse(fileContent);
      }
      bookList.push(this);
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
};
