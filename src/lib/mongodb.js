// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add MONGODB_URI to your .env file");
// }

// if (process.env.NODE_ENV === "development") {
//   // Use a global variable to prevent multiple instances in dev
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
//   // Add more detailed error handling
//   clientPromise.catch(error => {
//     console.error("MongoDB connection error:", error);
//   });
// } else {
//   // In production, create a new connection
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// export default clientPromise;


import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

// Global Mongoose connection caching
let cachedMongoose = global.mongoose;
if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}

// Global MongoClient connection caching
let cachedMongoClient = global.mongoClient;
if (!cachedMongoClient) {
  cachedMongoClient = global.mongoClient = { client: null, promise: null };
}

export async function connectToMongoose() {
  if (cachedMongoose.conn) return cachedMongoose.conn;

  if (!cachedMongoose.promise) {
    cachedMongoose.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cachedMongoose.conn = await cachedMongoose.promise;
  return cachedMongoose.conn;
}

export async function connectToMongoClient() {
  if (cachedMongoClient.client) return cachedMongoClient.client;

  if (!cachedMongoClient.promise) {
    cachedMongoClient.promise = new MongoClient(MONGODB_URI).connect();
  }

  cachedMongoClient.client = await cachedMongoClient.promise;
  return cachedMongoClient.client;
}
