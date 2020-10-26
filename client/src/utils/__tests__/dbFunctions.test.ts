jest.mock("axios");
import axios from "axios";
import * as dbFunctions from "../dbFunctions";

const userDetails = {
  username: "testUser",
  password: "password"
};

const fakeQuiz = {
  title: "new quiz",
  questions: [{ question: "Q", allReplies: ["a", "b", "c"], rightReply: "a" }],
  isPrivate: false
};

describe("authentication functions", () => {
  // clear the mock functions call count!
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("axios mocking", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(9);

    const result = await axios.get("/");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/");
    expect(result).toBe(9);
  });

  test("loginUser function", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: null, payload: { username: "testUser" } },
      error: null
    });

    const response = await dbFunctions.loginUser(userDetails);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/api/auth/login", userDetails);
    expect(response).toBeTruthy();
    expect(response.payload).toHaveProperty("username", "testUser");
  });

  test("registerUser function", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { payload: { username: "testUser" }, error: null, message: null }
    });

    const response = await dbFunctions.registerUser({
      ...userDetails,
      passwordConfirmation: "password"
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/api/auth/register", {
      ...userDetails
    });
    expect(response.message).toBeNull();
    expect(response.error).toBeNull();
    expect(response.payload).toHaveProperty("username", "testUser");
  });

  test("logoutUser function", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({});
    await dbFunctions.logoutUser();

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

describe("quiz functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createQuiz function", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        message: "Quiz created",
        payload: { title: "new quiz" },
        error: null
      }
    });

    const response = await dbFunctions.createQuiz(fakeQuiz, "fakeUserId");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/api/quiz", {
      quiz: fakeQuiz,
      createdBy: "fakeUserId"
    });
    expect(response.message).toMatch(/Quiz created/);
    expect(response.error).toBeNull();
    expect(response.payload).toHaveProperty("title", "new quiz");
  });

  test("getSingleQuiz function", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        title: "found quiz"
      }
    });

    const response = await dbFunctions.getSingleQuiz("fakeQuizId");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/quiz/fakeQuizId");
    expect(response.title).toMatch(/found quiz/);
  });

  test("getCustomUsersQuizzes function", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        message: "All quizzes",
        error: null,
        payload: ["quiz1", "quiz2"]
      }
    });
    const response = await dbFunctions.getCustomUsersQuizzes();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/quiz");
    expect(response.message).toMatch("All quizzes");
    expect(response.error).toBeNull();
    expect(response.payload.length).toBe(2);
    expect(response.payload[0]).toBe("quiz1");
  });

  test("deleteQuiz function", async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: "QUIZ DELETED" });
    const response = await dbFunctions.deleteQuiz("fakeUserId", "fakeQuizId");
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      "/api/quiz/fakeUserId/fakeQuizId"
    );
  });

  test("editQuiz function", async () => {
    (axios.patch as jest.Mock).mockResolvedValueOnce({});
    await dbFunctions.editQuiz("fakeQuizId", fakeQuiz);
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith("/api/quiz/fakeQuizId", {
      updatedQuiz: fakeQuiz
    });
  });

  test("getUserQuizzes function", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        payload: [{ title: "quiz1" }, { title: "quiz2" }]
      }
    });
    const response = await dbFunctions.getUserQuizzes("fakeUserId");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/user/fakeUserId");
    expect(response.length).toBe(2);
    expect(response[0]).toHaveProperty("title", "quiz1");
  });
});
