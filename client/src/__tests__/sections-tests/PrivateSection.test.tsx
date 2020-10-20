import React from "react";
import { PrivateSection } from "../../components/sections/private/PrivateSection";
import { render, screen, wait } from "@testing-library/react";
import { TestProvider, iAuthContext } from "../../contexts/auth/Auth";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthScope } from "../../models/AuthScope";
import { modifyObjectProperty } from "../../utils/functions";
import userEvent from "@testing-library/user-event";

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
    questions: [{ question: "Q", allReplies: ["a", "b", "c"], rightReply: "a" }]
  },
  {
    title: "Second",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1484353890732-25113ccdd04f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    isPrivate: true,
    questions: [{ question: "Q", allReplies: ["a", "b", "c"], rightReply: "a" }]
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

describe("clicking on create quiz opens the form", () => {
  test("the click changes the view", async () => {
    renderComponent(addUserAndQuizzes(testQuizzes), "register");
    const createButton = screen.getByText("Create a new quiz");
    userEvent.click(createButton);

    await wait(() => {
      screen.getByLabelText("QUIZ TITLE");
      screen.getByText("WHAT DO YOU WANT TO DO WITH THIS QUIZ?");
    });
  });
});
