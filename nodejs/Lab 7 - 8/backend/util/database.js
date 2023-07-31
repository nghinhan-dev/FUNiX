const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "NghiNhan@&)(2222", {
  dialect: "mysql",
  host: "127.0.0.1",
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

module.exports = sequelize;
