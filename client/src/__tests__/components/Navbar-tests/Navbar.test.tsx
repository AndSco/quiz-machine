import React from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const renderComponent = () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
};

describe("navbar component", () => {
  test("it renders all components correctly on big screens", () => {
    window = Object.assign(window, { innerWidth: 1400 });
    renderComponent();
    screen.getByText(/machine/i);
    screen.getByText("TRIVIA QUIZ");
    screen.getByText("PROGRAMMING QUIZ");
    screen.getByText("USERS' QUIZZES");
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Create your own quiz");
  });

  test("on smaller screens the button section disappears & burger appears", () => {
    window = Object.assign(window, { innerWidth: 600 });
    renderComponent();
    screen.getByText(/machine/i);
    expect(screen.queryByText("TRIVIA QUIZ")).toBeNull();
    expect(screen.queryByText("PROGRAMMING QUIZ")).toBeNull();
    expect(screen.queryByText("USERS' QUIZZES")).toBeNull();
    screen.getByTestId("burger-icon");
  });
});
