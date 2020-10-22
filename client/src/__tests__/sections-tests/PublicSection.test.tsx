import React from "react";
import { PublicQuizzes } from "../../components/sections/public/PublicQuizzes";
import { TestProvider } from "../../contexts/quizzes/Quizzes";
import { render, screen } from "@testing-library/react";

const renderComponent = render(
  <TestProvider value={}>
    <PublicQuizzes />
  </TestProvider>
);

describe("public section", () => {
  test("it renders correctly", () => {});
});
