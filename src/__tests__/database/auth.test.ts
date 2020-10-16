// DB REGISTRATION AND LOGIN
import "regenerator-runtime/runtime";
import { User, iUser } from "../../models/user";
import { app } from "../../app";
import supertest from "supertest";
import { setupDb } from "../../db-tests-setup";
const request = supertest(app);

const authenticateUser = async (
  username: string,
  password: string,
  scope: "login" | "registration"
) => {
  const response: any = await request
    .post(scope === "registration" ? "/api/auth/register" : "/api/auth/login")
    .send({ username, password });

  return response;
};

setupDb("auth-tests");

describe("registration endpoint", () => {
  test("it register a valid user and hashes pword", async () => {
    const USERNAME = "antonino";
    const PASSWORD = "fakePassword";
    const response: any = await authenticateUser(
      USERNAME,
      PASSWORD,
      "registration"
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBeNull();
    expect(response.body.error).toBeNull();
    expect(response.body.payload).toHaveProperty("username", USERNAME);

    const userInDatabase: iUser = (await User.findOne({
      username: USERNAME
    })) as iUser;
    expect(userInDatabase).toBeTruthy();
    expect(userInDatabase.password).not.toBe(PASSWORD);
  });

  test("it doesn't register if username is shorter than 4 letters", async () => {
    const response: any = await authenticateUser(
      "and",
      "password",
      "registration"
    );

    expect(response.body.message).toMatch(
      /Please use a username longer than 3 characters/
    );
    expect(response.body.payload).toBeNull();
    expect(response.body.error).toBeNull();
  });

  test("it doesn't register if password is shorter tha 7 letters", async () => {
    const response = await authenticateUser("John", "123456", "registration");

    expect(response.body.message).toMatch(
      /Please use a password at least 7 characters long/
    );
    expect(response.body.payload).toBeNull();
    expect(response.body.error).toBeNull();
  });

  test("it doesn't register users with same username", async () => {
    const DUPLICATE_USERNAME = "franco";
    await authenticateUser(DUPLICATE_USERNAME, "password1", "registration");

    const response = await authenticateUser(
      DUPLICATE_USERNAME,
      "password2",
      "registration"
    );
    expect(response.body.message).toMatch(/Username already taken!/);
    expect(response.body.payload).toBeNull();
    expect(response.body.error).toBeNull();
  });
});

describe("login endpoint", () => {
  test("logs in user already registered", async () => {
    const USERNAME = "andrea";
    const PASSWORD = "password";
    await authenticateUser(USERNAME, PASSWORD, "registration");
    const response = await authenticateUser(USERNAME, PASSWORD, "login");

    expect(response.status).toBe(200);
    expect(response.body.error).toBeNull();
    expect(response.body.message).toBeNull();
    expect(response.body.payload).toBeTruthy();
    expect(response.body.payload).toHaveProperty("username", USERNAME);
  });

  test("sends message for wrong username", async () => {
    const response = await authenticateUser("gino", "password", "login");
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(
      /Wrong username or password. Try again!/
    );
  });

  test("sends message for wrong password", async () => {
    await authenticateUser("gino", "password", "registration");
    const response = await await authenticateUser(
      "gino",
      "wrongPassword",
      "login"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(
      /Wrong username or password. Try again!/
    );
  });
});

describe("logout endpoint", () => {
  test.only("it logs out user", async () => {
    await authenticateUser("andrea", "password", "login");
    const response = await request.post("/api/auth/logout");
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Logged you out!/);
  });
});
