import React from "react";
import { PublicQuizzes } from "../../components/sections/public/PublicQuizzes";
import { TestProvider } from "../../contexts/quizzes/Quizzes";
import { render, screen, wait } from "@testing-library/react";
import { QuizType, Subject } from "../../models/PublicQuizQuestion";
import { Difficulty } from "../../models/TriviaApi";
import { click } from "../../utils/test-utils";

const contextStartingValue = {
  quizType: QuizType.TRIVIA,
  currentSubject: "" as Subject,
  numberOfQuestions: 5,
  difficultyLevel: "medium" as Difficulty,
  quizConfigurationStep: 1,
  questions: [],
  configQuiz: () => {},
  startedQuiz: false,
  goToNextQuizConfiguration: () => {},
  uploadQuestions: () => {},
  reset: () => {},
  getPublicQuizQuestions: () => {},
  quizFetchError: null
};

const renderComponent = () =>
  render(
    <TestProvider value={{ ...contextStartingValue }}>
      <PublicQuizzes />
    </TestProvider>
  );

describe("public section", () => {
  test("it renders correctly", () => {
    renderComponent();
    screen.getByText(/choose a topic/i);
    screen.getByText(/animals/i);
    screen.getByText("Art");
    screen.getByText(/celebrities/i);
  });

  test("the config steps work", async () => {
    renderComponent();
    const animalsCategory = screen.getByText("Animals");
    click(animalsCategory);
    await wait(() => screen.getByText("How many questions?"));
  });
});
