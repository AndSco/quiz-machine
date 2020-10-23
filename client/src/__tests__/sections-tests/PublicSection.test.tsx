jest.mock("../../utils/functions.ts", () => ({
  ...jest.requireActual("../../utils/functions.ts"),
  getQuestions: jest.fn(() => {})
}));
import { getQuestions } from "../../utils/functions";
import React from "react";
import { PublicQuizzes } from "../../components/sections/public/PublicQuizzes";
import { QuizzesContextProvider } from "../../contexts/quizzes/Quizzes";
import { render, screen, wait } from "@testing-library/react";
import { click } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const renderComponent = () =>
  render(
    <QuizzesContextProvider>
      <PublicQuizzes />
    </QuizzesContextProvider>
  );

const goToNextStep = () => {
  click(screen.getByRole("button"));
};

beforeEach(jest.clearAllMocks);

describe("public section", () => {
  test("it renders correctly", () => {
    renderComponent();
    screen.getByText(/choose a topic/i);
    screen.getByText(/animals/i);
    screen.getByText("Art");
    screen.getByText(/celebrities/i);
  });

  test("the config steps work with default settings", async () => {
    renderComponent();
    const animalsCategory = screen.getByText("Animals");
    click(animalsCategory);

    screen.getByText("How many questions?");
    goToNextStep();
    screen.getByText("How difficult?");
    goToNextStep();
    screen.getByText("5");
    screen.getByText(/medium/i);
    screen.getByText(/animals/i);
    const buttons = screen.getAllByRole("button");

    expect(buttons[0]).toHaveTextContent(/start quiz/i);
    expect(buttons[1]).toHaveTextContent(/reset/i);

    click(buttons[0]);
    await wait(() => expect(getQuestions).toHaveBeenCalledTimes(1));
    expect(getQuestions).toHaveBeenCalledWith({
      quizType: "trivia",
      difficulty: "medium",
      numOfQuestions: 5,
      subject: "Animals"
    });
  });

  test("it works by customising options", async () => {
    renderComponent();
    const booksSection = screen.getByText(/books/i);
    click(booksSection);
    const questionNumberInput = screen.getByRole("spinbutton");
    userEvent.type(questionNumberInput, "10");
    goToNextStep();
    const difficultySelector = screen.getByRole("combobox");
    userEvent.selectOptions(difficultySelector, "hard");
    goToNextStep();
    screen.getByText("10");
    screen.getByText(/hard/i);
    screen.getByText(/entertainment: books/i);
    const startQuizButton = screen.getByText(/start quiz/i);
    click(startQuizButton);
    await wait(() => expect(getQuestions).toHaveBeenCalledTimes(1));
    expect(getQuestions).toHaveBeenCalledWith({
      quizType: "trivia",
      difficulty: "hard",
      numOfQuestions: 10,
      subject: "Entertainment: Books"
    });
  });

  test("it prints the error message if no enough questions are found", async () => {
    (getQuestions as jest.Mock).mockImplementationOnce(() => []);
    renderComponent();
    const artCategory = screen.getByText("Art");
    click(artCategory);
    goToNextStep();
    goToNextStep();
    const startQuizButton = screen.getByText(/start quiz/i);
    click(startQuizButton);
    await wait(() => expect(getQuestions).toHaveBeenCalledTimes(1));
    expect(getQuestions).toHaveReturnedWith([]);
    screen.getByText(
      "Not enough quizzes matching these parameters. Try again!"
    );
  });
});
