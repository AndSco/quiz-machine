jest.mock("../../../utils/dbFunctions.ts");
import { getSingleQuiz } from "../../../utils/dbFunctions";
import React from "react";
import { ActualPrivateQuiz } from "../../../components/sections/private/ActualPrivateQuiz";
import { render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { registerIcons } from "../../../utils/registerFontawesomeIcons";
import { click } from "../../../utils/test-utils";
import { getValueWhichIsNot } from "../../../utils/functions";

registerIcons();

const testQuiz: PrivateQuiz = {
  title: "Custom quiz",
  isPrivate: false,
  _id: "fakeId",
  questions: [
    {
      question: "Question1",
      allReplies: ["ONE", "TWO"],
      rightReply: "TWO"
    },
    {
      question: "Question2",
      allReplies: ["B", "C"],
      rightReply: "C"
    }
  ]
};

const fetchReply = (text: string) => screen.getByText(text);

const getAnswer = (answerType: "right" | "wrong") => {
  const questionText = screen.getByTestId("quiz-question").textContent;
  const currentQuestion = testQuiz.questions.find(
    q => q.question === questionText
  );

  const WRONG_REPLY = getValueWhichIsNot(
    currentQuestion!.allReplies,
    currentQuestion!.rightReply
  ) as string;

  return answerType === "right"
    ? fetchReply(currentQuestion!.rightReply)
    : fetchReply(WRONG_REPLY);
};

const getNextButton = () => screen.getByRole("button");
const goToNextQuestion = () => click(getNextButton());
const renderComponent = () => {
  render(<ActualPrivateQuiz quizId="fakeId" />);
};

beforeEach(() => jest.clearAllMocks());

describe("custom quiz created by a user", () => {
  test("it renders and plays correctly a winning quiz", async () => {
    (getSingleQuiz as jest.Mock).mockResolvedValueOnce(testQuiz);
    renderComponent();

    await wait(() => {
      expect(getSingleQuiz).toHaveBeenCalledTimes(1);
    });

    expect(getSingleQuiz).toHaveBeenCalledWith("fakeId");
    screen.getByText("1/2");

    const rightAnswer = getAnswer("right");
    click(rightAnswer);

    await wait(() =>
      expect(rightAnswer).toHaveStyle("background-color: #31ea31")
    );

    goToNextQuestion();

    const secondRightAnswer = getAnswer("right");
    click(secondRightAnswer);
    goToNextQuestion();

    await wait(() => screen.getByText(/Your score: 2\/2/i));
    expect(screen.getByRole("button")).toHaveTextContent(/take another quiz/i);
    screen.getByText("🥳 Perfect!!");
  });

  test("handles wrong answers", async () => {
    (getSingleQuiz as jest.Mock).mockResolvedValueOnce(testQuiz);
    renderComponent();
    await wait(() => screen.getByText("1/2"));

    const wrongAnswer = getAnswer("wrong");
    click(wrongAnswer);
    expect(wrongAnswer).toHaveStyle("background-color: #ff0f0f");
    goToNextQuestion();
    const secondWrongAnswer = getAnswer("wrong");
    click(secondWrongAnswer);
    goToNextQuestion();
    screen.getByText("😭 You can do better!");
  });
});
