import mongoose from "mongoose";
import { mongoURI } from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise;

export const connectToDatabase = async (connectionString: string) => {
  try {
    // const connectionString = `${mongoURI}${dbName}?retryWrites=true&w=majority`;
    // console.log("connecting to db", dbName);
    await mongoose.connect(connectionString as string, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Database connected!");
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const removeAllCollections = async () => {
  console.log("removing all collections");
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
};

// this is used to drop all collection, which in turn deletes the whole db
const dropAllCollections = async () => {
  console.log("dropping collections");
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;

      console.log(error.message);
    }
  }
};

export const closeConnection = async () => {
  await dropAllCollections();
  await mongoose.connection.close();
};
