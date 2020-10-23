jest.mock("../../../utils/functions.ts", () => ({
  ...jest.requireActual("../../../utils/functions.ts"),
  copyQuizUrlToCipboard: jest.fn(() => {})
}));
jest.mock("../../../utils/dbFunctions.ts");
import { copyQuizUrlToCipboard } from "../../../utils/functions";
import { deleteQuiz, createQuiz, editQuiz } from "../../../utils/dbFunctions";
import React from "react";
import { PrivateSection } from "../../../components/sections/private/PrivateSection";
import { render, screen, wait } from "@testing-library/react";
import { TestProvider, iAuthContext } from "../../../contexts/auth/Auth";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthScope } from "../../../models/AuthScope";
import { modifyObjectProperty } from "../../../utils/functions";
import { registerIcons } from "../../../utils/registerFontawesomeIcons";
import { click, enterText } from "../../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

registerIcons();
beforeEach(() => jest.clearAllMocks());

const startingValue: iAuthContext = {
  currentUser: null,
  loadCurrentUser: (user: any) => {},
  isInPrivateSection: false,
  goToPrivateSection: () => {},
  goToPublicSection: () => {},
  userQuizzes: [],
  refreshUserQuizzes: () => {},
  logout: () => {}
};

const testQuizzes = [
  {
    title: "My first quiz",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1484353890732-25113ccdd04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    isPrivate: false,
    questions: [
      { question: "Q", allReplies: ["a", "b", "c"], rightReply: "a" }
    ],
    _id: "idNumber"
  },
  {
    title: "Second",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1484353890732-25113ccdd04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    isPrivate: true,
    questions: [
      { question: "Q", allReplies: ["a", "b", "c"], rightReply: "a" }
    ],
    _id: "idNumber2"
  }
];

const userWithoutQuizzes = {
  username: "andrea",
  quizzes: [],
  _id: "fakeId"
};

const userWithQuizzes = {
  username: "andrea",
  quizzes: testQuizzes,
  _id: "fakeId"
};

const addCurrentUser = modifyObjectProperty(startingValue)("currentUser");
const addUserAndQuizzes = modifyObjectProperty(addCurrentUser(userWithQuizzes))(
  "userQuizzes"
);

const renderWithUser = () => {
  renderComponent(addUserAndQuizzes(testQuizzes), "register");
};

const startCreatingQuiz = () => {
  renderWithUser();
  const createButton = screen.getByText("Create a new quiz");
  click(createButton);
};

const renderComponent = (providerValue: any, activity: AuthScope) => {
  render(
    <TestProvider value={providerValue}>
      <Router>
        <PrivateSection activity={activity} />
      </Router>
    </TestProvider>
  );
};

describe("private section widthout a current user", () => {
  test("it renders the login form without a curent user", () => {
    renderComponent(startingValue, "login");

    screen.getByText("Nice to see you back!");
    screen.getByText("Log in");
  });

  test("it renders the register form without a curent user", () => {
    renderComponent(startingValue, "register");

    screen.getByText("Join the community!");
    screen.getByText("register");
  });
});

describe("private section with a current user in context", () => {
  test("it greets a user with no quizzes yet and invites to create one", () => {
    renderComponent(addCurrentUser(userWithoutQuizzes), "login");
    screen.getByText("Welcome ANDREA");
    screen.getByText("No custom quizzes yet...");
    screen.getByText(/create one now/i);
  });

  test("it lists the quizzes of the current user in context", () => {
    renderComponent(addUserAndQuizzes(testQuizzes), "login");
    screen.getByText("Welcome ANDREA");
    screen.getByText("Your quizzes");
    screen.getByText("Create a new quiz");
    screen.getByText("My first quiz");
    screen.getByText("Second");
    expect(screen.queryAllByText(/TAKE QUIZ/i).length).toBe(2);
    expect(screen.queryAllByText(/copy url/i).length).toBe(2);
    expect(screen.queryAllByText(/edit/i).length).toBe(2);
    expect(screen.queryAllByText(/delete/i).length).toBe(2);
  });
});

describe("quiz creation form workflow works correctly", () => {
  test("the click changes the view", async () => {
    (createQuiz as jest.Mock).mockResolvedValueOnce({});
    startCreatingQuiz();

    expect(screen.getByRole("heading")).toHaveTextContent("Create your quiz");
    screen.getByLabelText("QUIZ TITLE");
    screen.getByText("WHAT DO YOU WANT TO DO WITH THIS QUIZ?");
    const quizTitleInput = screen.getByLabelText("QUIZ TITLE");
    enterText(quizTitleInput, "quiz one");

    const changeImageOption = screen.getByRole("img");
    click(changeImageOption);
    screen.getByLabelText(/image background url/i);

    const addQuestionButton = screen.getByText("Add a question");
    click(addQuestionButton);
    const questionInput = screen.getByLabelText("ENTER THE QUESTION");
    enterText(questionInput, "Who?");
    const proceedButton = screen.getByText("Next");
    click(proceedButton);
    const correctReplyInput = screen.getByLabelText("ENTER THE CORRECT ANSWER");
    enterText(correctReplyInput, "Right");
    const addIcon = screen.getByTestId("input-icon");
    click(addIcon);
    const wrongReplyInput = screen.getByLabelText("ADD A (WRONG) ANSWER");
    enterText(wrongReplyInput, "Wrong");
    const addWrongReplyIcon = screen.getByTestId("input-icon");
    click(addWrongReplyIcon);
    screen.getByLabelText("ADD ANOTHER (WRONG) ANSWER");

    const saveQuestionButton = screen.getByText("SAVE QUESTION");
    click(saveQuestionButton);
    screen.getByText("Add another question");

    const saveQuizButton = screen.getByText("SAVE QUIZ");
    click(saveQuizButton);

    await wait(() => expect(createQuiz).toHaveBeenCalledTimes(1));
    const functionArgs = (createQuiz as jest.Mock).mock.calls[0];

    expect(functionArgs[0]).toHaveProperty("title", "Quiz one");
    expect(functionArgs[0]).toHaveProperty(
      "backgroundImageUrl",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    );
    expect(functionArgs[0]).toHaveProperty("isPrivate", true);
    expect(functionArgs[0].questions.length).toBe(1);
    expect(functionArgs[0].questions[0].question).toBe("Who?");
    expect(functionArgs[1]).toBe("fakeId");
  });

  test("it closes the quiz creation modal", () => {
    startCreatingQuiz();
    const closeModalButton = screen.getByTestId("close-modal-icon");
    click(closeModalButton);
    expect(screen.queryByLabelText("QUIZ TITLE")).toBeNull();
    screen.getByText("Welcome ANDREA");
  });
});

describe("user's management of his own quiz", () => {
  test("user can copy URL of his quiz", () => {
    renderWithUser();
    const copyUrlButton = screen.getAllByText(/copy url/i)[0];
    click(copyUrlButton);
    expect(copyQuizUrlToCipboard).toHaveBeenCalledTimes(1);
  });

  test("user can edit his quiz", async () => {
    (editQuiz as jest.Mock).mockResolvedValueOnce({});
    renderWithUser();
    const editButton = screen.getAllByText(/edit/i)[0];
    click(editButton);
    expect(screen.getByLabelText(/quiz title/i)).toHaveValue("My first quiz");
    screen.getByText(/add another question/i);
    const quizTitleInput = screen.getByLabelText(/quiz title/i);
    enterText(quizTitleInput, "edited quiz");
    const saveEditsButton = screen.getByRole("button");
    expect(saveEditsButton).toHaveTextContent(/edit quiz/i);
    click(saveEditsButton);

    await wait(() => expect(editQuiz).toHaveBeenCalledTimes(1));
    const functionArgs = (editQuiz as jest.Mock).mock.calls[0];
    expect(functionArgs[1]).toHaveProperty("title", "Edited quiz");
  });

  test("user can delete his quiz", async () => {
    (deleteQuiz as jest.Mock).mockResolvedValueOnce("deleted!");
    renderWithUser();
    const deleteButton = screen.getAllByText(/delete/i)[0];
    click(deleteButton);
    screen.getByText(/sure you want to continue?/i);
    const actionButtons = screen.getAllByRole("button");
    const [goAheadAndDelete, cancel] = actionButtons;
    expect(goAheadAndDelete).toHaveTextContent("Yes");
    expect(cancel).toHaveTextContent("Cancel");
    click(goAheadAndDelete);
    await wait(() => {
      expect(deleteQuiz).toHaveBeenCalledTimes(1);
      expect(deleteQuiz).toHaveBeenCalledWith("idNumber");
    });
  });
});
