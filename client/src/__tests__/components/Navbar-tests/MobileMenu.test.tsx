import React from "react";
import { MobileMenu } from "../../../components/Navbar/MobileMenu";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

const renderComponent = (visible: boolean = true) => {
  render(
    <Router>
      <MobileMenu isVisible={visible} closeMenu={() => "close"} />
    </Router>
  );
};

describe("mobile menu", () => {
  test("it renders correctly", () => {
    renderComponent();
    screen.getByText("TRIVIA QUIZ");
    screen.getByText("PROGRAMMING QUIZ");
    screen.getByText("USERS' QUIZZES");
    screen.getByText("Create your own quiz!");
    expect(screen.getAllByRole("button").length).toBe(2);
  });
});
