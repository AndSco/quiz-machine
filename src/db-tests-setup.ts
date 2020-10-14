import {
  connectToDatabase,
  removeAllCollections,
  closeConnection
} from "./handlers/dbConnection";

export const setupDb = (connectionString: string) => {
  beforeAll(async () => await connectToDatabase(connectionString));

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await closeConnection();
  });
};
