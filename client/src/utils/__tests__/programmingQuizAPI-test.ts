jest.mock("../ApiRequest.ts");
import { getProgrammingQuizApiQuestions } from "../programmingQuizAPI";
import ApiRequest from "../ApiRequest";

describe("functions to retrieve quizzes from programming API - https://quizapi.io/", () => {
  test("it builds the URL string correctly", async () => {
    (ApiRequest as jest.Mock).mockResolvedValueOnce("test");
    await getProgrammingQuizApiQuestions(10, "bash", "medium");
    expect(ApiRequest).toHaveBeenCalledTimes(1);
  });
});
