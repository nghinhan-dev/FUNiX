const { getDB } = require("../util/database");
const { ObjectId } = require("mongodb");

class Book {
  constructor(title, price, description, imageUrl, _id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new ObjectId(_id);
  }

  async save() {
    const db = getDB(); // Use getDB function to get the connected database

    if (this._id) {
      return await db
        .collection("books")
        .updateOne({ _id: this._id }, { $set: this });
    }

    return await db.collection("books").insertOne(this);
  }

  static async fetchAll() {
    const db = getDB();

    return await db.collection("books").find().toArray();
  }

  static async findById(prdId) {
    const db = getDB();

    return await db.collection("books").findOne({ _id: new ObjectId(prdId) });
  }
}

module.exports = Book;
