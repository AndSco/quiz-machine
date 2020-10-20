import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { QuestionCard } from "../../ActualQuizComponents/QuestionCard";
import { render } from "@testing-library/react";
import { PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { Colors } from "../../../constants/colors";
import { Question } from "../../../models/PublicQuizQuestion";

const testPrivateQuestion: PrivateQuizQuestion = {
  question: "What is the capital of Italy?",
  allReplies: ["Rome", "Milan", "Turin"],
  rightReply: "Rome"
};

const testPublicAPIQuestion: Question = {
  ...testPrivateQuestion,
  difficulty: "hard",
  subject: "Geography"
};

const renderPublicAPIQuizQuestion = () => {
  const { getByText } = render(
    <QuestionCard
      quizType="public"
      question={testPublicAPIQuestion}
      numberOfQuestions={7}
      currentNumberOfQuestion={2}
      next={() => {}}
      givePoint={() => {}}
    />
  );

  return getByText;
};

const renderPrivateQuizQuestion = () => {
  const { getByText } = render(
    <QuestionCard
      quizType="private"
      question={testPrivateQuestion}
      numberOfQuestions={10}
      currentNumberOfQuestion={1}
      next={() => {}}
      givePoint={() => {}}
    />
  );

  return getByText;
};

describe("QuestionCard component with private question", () => {
  test("it renders correctly with a private quiz question and clicking right answer", () => {
    const getByText = renderPrivateQuizQuestion();

    getByText("What is the capital of Italy?");
    getByText("1/10");
    getByText("NEXT");
    const rightAnswer = getByText("Rome");
    getByText("Milan");
    getByText("Turin");

    userEvent.click(rightAnswer);
    expect(rightAnswer).toHaveStyle("background-color: #31ea31");
  });

  test("it renders correctly with a private quiz question and clicking wrong answer", () => {
    const getByText = renderPrivateQuizQuestion();
    const wrongAnswer = getByText("Milan");
    userEvent.click(wrongAnswer);
    expect(wrongAnswer).toHaveStyle("background-color: #ff0f0f");
  });

  test("renders a private question with code", () => {
    const questionWithCode = testPrivateQuestion;
    questionWithCode.code = "console.log('Rome')";
    const { getByText } = render(
      <QuestionCard
        quizType="private"
        question={questionWithCode}
        numberOfQuestions={5}
        currentNumberOfQuestion={3}
        next={() => {}}
        givePoint={() => {}}
      />
    );

    getByText("console.log('Rome')");
  });

  test("next button is initially disabled, and activates after an answer is selected", () => {
    const getByText = renderPrivateQuizQuestion();
    const nextButton = getByText("NEXT");
    const selectedReply = getByText("Turin");
    expect(nextButton).toHaveStyle(`background-color: ${Colors.LIGHTER_GREY}`);
    expect(nextButton).toHaveProperty("disabled", true);
    userEvent.click(selectedReply);
    expect(nextButton).toHaveStyle(`background-color: ${Colors.VIOLET}`);
    expect(nextButton).toHaveProperty("disabled", false);
  });
});

describe("QuestionCard component with public API question", () => {
  test("it renders the subject and difficulty details", () => {
    const getByText = renderPublicAPIQuizQuestion();
    getByText("Geography");
    getByText("HARD");
    getByText("2/7");
  });
});
