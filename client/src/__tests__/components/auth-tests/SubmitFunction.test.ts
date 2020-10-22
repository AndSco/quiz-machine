jest.mock("../../../utils/dbFunctions.ts");
import { handleSubmit } from "../../../components/auth/SubmitFunction";
import { loginUser, registerUser } from "../../../utils/dbFunctions";

beforeEach(() => jest.clearAllMocks());

describe("function handling authentication validation - LOGIN", () => {
  test("returns failure status if meesage gets through from API", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      payload: null,
      error: null,
      message: "there was a problem",
      status: "failure"
    });

    const result = await handleSubmit("login", {
      username: "testUser",
      password: "password"
    });

    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith({
      username: "testUser",
      password: "password"
    });

    expect(result).toHaveProperty("status", "failure");
  });

  test("returns failure status if there is an error in API response", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      payload: null,
      error: "error",
      message: null,
      status: "failure"
    });

    const result = await handleSubmit("login", {
      username: "testUser",
      password: "password"
    });

    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty("status", "failure");
  });

  test("returns success status if an user is in payload without errors or messages", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      payload: { username: "fake" },
      error: null,
      message: null,
      status: "success"
    });

    const result = await handleSubmit("login", {
      username: "testUser",
      password: "password"
    });

    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("payload", { username: "fake" });
  });
});

describe("function handling authentication validation - REGISTER", () => {
  test("successful registration", async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({
      payload: {
        username: "test"
      },
      error: null,
      message: null,
      status: "success"
    });

    const response = await handleSubmit("register", {
      username: "andrea",
      password: "password",
      passwordConfirmation: "password"
    });

    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(registerUser).toHaveBeenCalledWith({
      username: "andrea",
      password: "password",
      passwordConfirmation: "password"
    });
    expect(response).toHaveProperty("status", "success");
    expect(response).toHaveProperty("payload", { username: "test" });
  });
});

describe("handles errors well and returns them", () => {
  test("login error", async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(new Error("ERROR!!"));

    const response = await handleSubmit("login", {
      username: "andrea",
      password: "password"
    });
    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith({
      username: "andrea",
      password: "password"
    });

    expect(response).toHaveProperty("status", "failure");
    expect(response).toHaveProperty("error", "ERROR!!");
  });

  test("registration error", async () => {
    (registerUser as jest.Mock).mockRejectedValueOnce(
      new Error("Registration ERROR!!")
    );

    const response = await handleSubmit("register", {
      username: "andrea",
      password: "password",
      passwordConfirmation: "password"
    });
    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(registerUser).toHaveBeenCalledWith({
      username: "andrea",
      password: "password",
      passwordConfirmation: "password"
    });

    expect(response).toHaveProperty("status", "failure");
    expect(response).toHaveProperty("error", "Registration ERROR!!");
  });
});
