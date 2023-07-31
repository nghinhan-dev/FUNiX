const { getDB } = require("../util/database");

class Book {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  async save() {
    const db = getDB(); // Use getDB function to get the connected database

    return await db.collection("books").insertOne(this);
  }
}

module.exports = Book;
