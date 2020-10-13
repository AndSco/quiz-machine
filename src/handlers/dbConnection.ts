import mongoose from "mongoose";
import { mongoURI, productionDbName, testingDbName } from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise; // allows us to do without CALLBACKS!

const DB_NAME =
  process.env.NODE_ENV === "test" ? testingDbName : productionDbName;
// const connectionString = mongoConnection;
const connectionString = `${mongoURI}${DB_NAME}?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  try {
    console.log("connecting to db", DB_NAME);
    const db = await mongoose.connect(connectionString as string, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Database connected!");
    return db;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const disconnectFromDatabase = async (db: typeof mongoose) => {
  await db.disconnect();
};
