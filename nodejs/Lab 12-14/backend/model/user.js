const { getDB } = require("../util/database");
const { ObjectId } = require("mongodb");
class User {
  constructor(userName, email, id, cart) {
    this.userName = userName;
    this.email = email;
    this._id = id ? new ObjectId(id) : null;
    this.cart = cart;
  }

  async save() {
    const db = getDB();

    return await db.collection("users").insertOne(this);
  }

  async addToCart(product) {
    const db = getDB();
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    const cartItemIndex = this.cart.items.findIndex(
      (book) => book.prdID.toString() === product._id.toString()
    );

    if (cartItemIndex !== -1) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        prdID: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  async getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((prd) => prd.prdID);
    const products = await db
      .collection("books")
      .find({ _id: { $in: productIds } })
      .toArray();

    const cartItems = products.map((book) => {
      return {
        ...book,
        quantity: this.cart.items.find(
          (item) => item.prdID.toString() === book._id.toString()
        ).quantity,
      };
    });

    return cartItems;
  }

  static async findById(userId) {
    const db = getDB();

    return await db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
