const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}?retryWrites=true&writeConcern=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function searchMessage(message: string) {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const translations = database.collection(process.env.DB_COLLECTION);

    const cursor = await translations.find({$text: {$search: message}});
    await cursor.project({
      name: 1,
      description: 1,
      trainingData: 1,
      reply: 1
    });
    const results = await cursor.toArray();
    return results;
  }catch(err){
    console.error(err.message);
  }
   finally {
    await client.close();
  }
}
