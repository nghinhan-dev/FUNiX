const mongoose = require("mongoose");
const uri = process.env.DATABASE_URI;

async function mongooseRun() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
}

function getDb() {
  return client.db();
}

module.exports = {
  mongooseRun,
  getDb,
};
