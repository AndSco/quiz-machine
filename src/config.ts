import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

export const mongoConnection = process.env.MONGO_CONNECTION;
