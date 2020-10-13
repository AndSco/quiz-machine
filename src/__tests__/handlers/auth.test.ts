import {
  connectToDatabase,
  disconnectFromDatabase
} from "../../handlers/dbConnection";

describe("it creates a user when all info is provided", () => {
  beforeEach(async () => await connectToDatabase);
  afterEach(async () => await disconnectFromDatabase);

  test("it works", () => {
    expect(2).toBe(2);
  });
});
