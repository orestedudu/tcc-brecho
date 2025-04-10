const { MongoClient, ServerApiVersion, Collection } = require('mongodb');

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

    //Create the database "teste" and, inside it, the collection "devices".
    //Then, insert a document containing the key greeting with the value "Hello Mongo".

    const collection = client.db("test").collection('devices');
    
    //INSERT
    //console.log(await collection.insertOne({ greeting: 'Hello Mongo' }));

    //FIND ONE
    await collection.findOne({ greeting: 'Hello Mongo'}).then((document) => console.log(document.greeting));
    
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
