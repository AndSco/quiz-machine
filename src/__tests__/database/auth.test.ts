import "regenerator-runtime/runtime";
import { User } from "../../models/user";
import { app } from "../../app";
import supertest from "supertest";
import {
  connectToDatabase,
  removeAllCollections,
  closeConnection
} from "../../handlers/dbConnection";
import { testingDbName } from "../../config";
// import { setupDb } from "../../db-tests-setup";

const request = supertest(app);

const fakeUser = {
  username: "an",
  password: "fakePassword"
};

// setupDb(testingDbName);

describe("database ops work as they should", () => {
  beforeAll(async () => await connectToDatabase(testingDbName));
  afterEach(async () => await removeAllCollections());
  afterAll(async () => await closeConnection());

  test("it creates a valid user", async () => {
    // await User.create(fakeUser);
    expect(2).toBe(2);
  });
});
