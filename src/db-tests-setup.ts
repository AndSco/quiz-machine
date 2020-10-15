import {
  connectToTestDatabase,
  removeAllCollections,
  closeConnection,
  seedDb
} from "./handlers/dbConnection";
import { mongoTestConnection } from "./config";

export const setupDb = (dbName: string, needsSeeding: boolean = false) => {
  beforeAll(
    async () =>
      await connectToTestDatabase(mongoTestConnection as string, dbName)
  );

  needsSeeding && beforeEach(async () => await seedDb());

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await closeConnection();
  });
};
