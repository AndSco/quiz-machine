import mongoose from "mongoose";
import { User } from "../models/user";
import { mongoConnection as mongoProdConnection } from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise;

const connectMongoose = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected to " + connectionString);
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const connectToProductionDatabase = async () => {
  try {
    await connectMongoose(mongoProdConnection as string);
  } catch (err) {
    console.error(err);
  }
};

export const connectToTestDatabase = async (uri: string, dbName: string) => {
  try {
    const connectionString = `${uri}${dbName}?retryWrites=true&w=majority`;
    await mongoose.connect(connectionString, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to test database " + dbName);
  } catch (err) {
    console.error(err);
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

export const SEEDED_USERNAME = "testUser";

export const seedDb = async () => {
  console.log("seeding");
  await User.create({ username: SEEDED_USERNAME, password: "password" });
};
