jest.mock("../ApiRequest.ts");
import { getProgrammingQuizApiQuestions } from "../programmingQuizAPI";
import { getTriviaApiQuestions } from "../triviaAPI";
import ApiRequest from "../ApiRequest";
import { getCategoryId } from "../../models/TriviaApi";

(ApiRequest as jest.Mock).mockImplementation(() => "test");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Programming API - https://quizapi.io/", () => {
  test("it builds the URL string correctly and sends request", async () => {
    const response = await getProgrammingQuizApiQuestions(10, "bash", "medium");
    expect(ApiRequest).toHaveBeenCalledTimes(1);
    expect(ApiRequest).toHaveBeenCalledWith(
      "https://quizapi.io/api/v1/questions?apiKey=undefined&category=bash&difficulty=medium&limit=10",
      "programming"
    );
    expect(response).toBe("test");
  });
});

describe("Trivia API - https://opentdb.com/api_config.php", () => {
  test("it builds the URL string correctly and sends request", async () => {
    const response = await getTriviaApiQuestions(12, "Animals", "hard");
    const categoryCode = getCategoryId("Animals");
    expect(ApiRequest).toHaveBeenCalledTimes(1);
    expect(ApiRequest).toHaveBeenCalledWith(
      `https://opentdb.com/api.php?amount=12&category=${categoryCode}&difficulty=hard&type=multiple`,
      "trivia"
    );
    expect(response).toBe("test");
  });
});
