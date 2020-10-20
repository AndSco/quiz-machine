import React from "react";
import { render } from "@testing-library/react";
import { QuizBackground } from "../../ActualQuizComponents/QuizBackground";
import "@testing-library/jest-dom/extend-expect";

const imageUrl =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

describe("it renders quiz background correctly", () => {
  test("only background", () => {
    const { getByTestId } = render(
      <QuizBackground imageUrl={imageUrl} stopPlaying={() => {}} />
    );
    const background = getByTestId("quiz-background");
    expect(background).toHaveStyle(`background-image: url("${imageUrl}")`);
  });
});
