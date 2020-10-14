import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

export const mongoConnection = process.env.MONGO_CONNECTION;
export const mongoTestConnection = process.env.MONGO_CONNECTION_TEST;
export const sessionSecret = process.env.SESSION_SECRET;
export const mongoURI = process.env.MONGO_URI;
export const productionDbName = process.env.PROD_DB_NAME;
export const testingDbName = process.env.TEST_DB_NAME;
