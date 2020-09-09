import mongoose from "mongoose";
import { mongoConnection } from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise; // allows us to do without CALLBACKS!

const connectionString = mongoConnection;

export const connectToDatabase = () => {
  mongoose.connect(
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
