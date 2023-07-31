const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Book = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Book;
