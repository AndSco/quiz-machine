import React from "react";
import { Ending } from "../../../components/ActualQuizComponents/Ending";
import { render } from "@testing-library/react";
import { createScoreComment } from "../../../utils/functions";

const renderComponent = () => {
  const { ...accessors } = render(
    <Ending score={10} totalQuestions={20} playAgain={() => "Play"} />
  );

  return accessors;
};

describe("endgame component", () => {
  test("it renders correctly", async () => {
    const accessors = renderComponent();
    const expectedComment = createScoreComment(10, 20);

    accessors.getByText("Your score: 10/20");
    accessors.getByText(expectedComment);
    accessors.getByText("Take another quiz");
  });
});
