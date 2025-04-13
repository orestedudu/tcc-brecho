const { MongoClient, ServerApiVersion} = require('mongodb');

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

let collection;

module.exports = {
  connect: async () => {
    console.log("VAI CONECTAR?");
    await client.connect();
    collection = client.db('test').collection('devices');
  },

  collection: () => {
    return collection;
  },
  
};
