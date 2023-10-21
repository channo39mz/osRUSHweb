const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://65050197:no39mzmz@osdata.lqhabyr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function closeMongoDBConnection() {
  await client.close();
  console.log("Disconnected from MongoDB!");
}

async function listDatabases() {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}

async function createDatabase(databaseName) {
  const result = await client.db(databaseName).createCollection('newCollection');
  console.log(`Created new collection in database: ${databaseName}`);
}

async function readData(databaseName, collectionName, query) {
  console.log("read");
  const result = await client.db(databaseName).collection(collectionName).findOne(query);
  if (result) {
    console.log("Found data:");
    console.log(result);
  } else {
    console.log("Data not found.");
  }
}
async function readData2(databaseName, collectionName, query) {
  try {
    
    const result = await client.db(databaseName).collection(collectionName).findOne(query);
    if (result) {
      console.log("Found data:");
      console.log(result);
    } else {
      console.log("Data not found.");
    }
    // ส่งผลลัพธ์กลับ
    return result;
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB
    console.error('An error occurred:', error);
    return null;
  }
}

async function updateDataByName(databaseName, collectionName, query, update) {
  const result = await client.db(databaseName).collection(collectionName).updateOne(query, { $set: update });
  console.log(`Matched ${result.matchedCount} document(s)`);
  console.log(`Modified ${result.modifiedCount} document(s)`);
  console.log('test');
}

async function upsertDataByName(databaseName, collectionName, query, update) {
  const result = await client.db(databaseName).collection(collectionName).updateOne(query, { $set: update }, { upsert: true });
  if (result.upsertedCount > 0) {
    console.log(`Upserted document with ID: ${result.upsertedId._id}`);
  } else {
    console.log(`Matched ${result.matchedCount} document(s)`);
    console.log(`Modified ${result.modifiedCount} document(s)`);
  }
}

async function updateAllList(databaseName, collectionName, query, update) {
  const result = await client.db(databaseName).collection(collectionName).updateMany(query, { $set: update });
  console.log(`Matched ${result.matchedCount} document(s)`);
  console.log(`Modified ${result.modifiedCount} document(s)`);
}

async function deleteListByName(databaseName, collectionName, query) {
  const result = await client.db(databaseName).collection(collectionName).deleteOne(query);
  console.log(`Deleted ${result.deletedCount} document(s)`);
}

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection,
  listDatabases,
  createDatabase,
  readData,
  readData2,
  updateDataByName,
  upsertDataByName,
  updateAllList,
  deleteListByName
};
