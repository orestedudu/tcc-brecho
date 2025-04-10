

const { MongoClient, ServerApiVersion } = require('mongodb');

const password = 'jardel2001';
const uri = `mongodb+srv://Jardel:${password}@firstcluster.a7hehmz.mongodb.net/?appName=FirstCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Success in connection to MongoDB");

    // Insert greetings in the MongoDB and print in console. 
    const collection = client.db("test").collection('devices');
    console.log(await collection.insertOne({ greeting: 'Hello Mongo' }));

  } 
  catch (error){
    console.error("Error during connection: ", error)
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}
run();
