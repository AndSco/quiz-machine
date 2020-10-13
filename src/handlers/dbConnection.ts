import mongoose from "mongoose";
import { mongoURI, productionDbName, testingDbName } from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise; // allows us to do without CALLBACKS!

const DB_NAME =
  process.env.NODE_ENV === "test" ? testingDbName : productionDbName;
// const connectionString = mongoConnection;
const connectionString = `${mongoURI}${DB_NAME}?retryWrites=true&w=majority`;

let db: any = null;

export const connectToDatabase = () => {
  console.log("connecting to db", DB_NAME);
  db = mongoose.connect(
    connectionString as string,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        console.error(err);
        throw new Error(err.message);
      } else {
        console.log("Database connected!");
      }
    }
  );
};

export const disconnectFromDatabase = async () => {
  await db.disconnect();
};
