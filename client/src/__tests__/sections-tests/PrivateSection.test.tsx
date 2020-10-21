jest.mock("../../utils/functions.ts", () => ({
  ...jest.requireActual("../../utils/functions.ts"),
  copyQuizUrlToCipboard: jest.fn(() => {})
}));
jest.mock("../../utils/dbFunctions.ts");
import { copyQuizUrlToCipboard } from "../../utils/functions";
import { deleteQuiz } from "../../utils/dbFunctions";
import React from "react";
import { PrivateSection } from "../../components/sections/private/PrivateSection";
import { render, screen, getByText, wait } from "@testing-library/react";
import { TestProvider, iAuthContext } from "../../contexts/auth/Auth";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthScope } from "../../models/AuthScope";
import { modifyObjectProperty } from "../../utils/functions";
import { registerIcons } from "../../utils/registerFontawesomeIcons";
import { click, enterText } from "../../utils/test-utils";
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
    startCreatingQuiz();

    screen.getByLabelText("QUIZ TITLE");
    screen.getByText("WHAT DO YOU WANT TO DO WITH THIS QUIZ?");
    const quizTitleInput = screen.getByLabelText("QUIZ TITLE");
    enterText(quizTitleInput, "quiz one");
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
    screen.getByText("SAVE QUIZ");
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

  test("user can edit his quiz", () => {
    renderWithUser();
    const editButton = screen.getAllByText(/edit/i)[0];
    click(editButton);
    expect(screen.getByLabelText(/quiz title/i)).toHaveValue("My first quiz");
    screen.getByText(/add another question/i);
    expect(screen.getByRole("button")).toHaveTextContent(/edit quiz/i);
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
