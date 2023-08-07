const mongoose = require("mongoose");
const uri =
  "mongodb+srv://sillywhale:Q0wfauvCoGydCKuS@funix-sw.v8apyjj.mongodb.net/asm2-nj2?retryWrites=true&w=majority";

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
