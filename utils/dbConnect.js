const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otylb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connectToDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    // await client.db("toolsTestDB").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (err) {
    console.error(err);
  }
}
// connectToDB().catch(console.dir);

async function closeDB() {
  try {
    await client.close();
    console.log("Connection to MongoDB Atlas closed");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connectToDB,
  client,
  closeDB,
};
