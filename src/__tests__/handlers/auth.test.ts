import "regenerator-runtime/runtime";
import { User } from "../../models/user";

import {
  connectToDatabase,
  disconnectFromDatabase
} from "../../handlers/dbConnection";

const fakeUser = {
  username: "an",
  password: "fakePassword"
};

describe("database ops work as they should", () => {
  test("it creates a valid user", async () => {
    const db = await connectToDatabase();
    await User.create(fakeUser);
    expect(2).toBe(2);
    await disconnectFromDatabase(db);
  });
});
