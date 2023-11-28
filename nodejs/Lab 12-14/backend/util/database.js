const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri =
  "mongodb+srv://sillywhale:fDkzMGaq6378ATEr@funix-sw.v8apyjj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getDB() {
  return client.db(); // Return the connected database instance
}

module.exports = {
  connectToDB,
  getDB,
};
