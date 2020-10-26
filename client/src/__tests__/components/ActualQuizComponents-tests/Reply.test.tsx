import React from "react";
import { render, screen } from "@testing-library/react";
import { Reply } from "../../../components/ActualQuizComponents/Reply";
import { click } from "../../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

const mockReplyQuestion = jest.fn(() => {});
const mockGivePoint = jest.fn(() => {});

beforeEach(jest.clearAllMocks);

describe("Reply component", () => {
  test("it renders correctly with default usage API with HTML symbols", () => {
    render(
      <Reply
        isRight={false}
        hasReplied={false}
        replyNumber={2}
        replyText={`One&apos;s wrong reply`}
        replyQuestion={mockReplyQuestion}
        givePoint={mockGivePoint}
      />
    );

    expect(screen.getByText("3")).toBeTruthy();
    const answer = screen.getByText("One's wrong reply");
    expect(answer).toBeTruthy();

    click(answer);
    expect(mockReplyQuestion).toHaveBeenCalledTimes(1);
    expect(mockGivePoint).toHaveBeenCalledTimes(0);
  });

  test("it renders correctly for custom quizzes - not parsing HTML symbols", () => {
    render(
      <Reply
        isRight={true}
        hasReplied={true}
        replyNumber={0}
        replyText={`One&apos;s wrong reply`}
        replyQuestion={mockReplyQuestion}
        givePoint={mockGivePoint}
        usage="users"
      />
    );

    expect(screen.getByText("1")).toBeTruthy();
    const answer = screen.getByText("One&apos;s wrong reply");
    expect(answer).toBeTruthy();
    expect(answer).toHaveStyle("background-color: #31ea31");

    click(answer);
    expect(mockReplyQuestion).toHaveBeenCalledTimes(0);
    expect(mockGivePoint).toHaveBeenCalledTimes(0);
  });

  test("it gives point if answer is correct and user had not replied yet", () => {
    render(
      <Reply
        isRight={true}
        hasReplied={false}
        replyNumber={2}
        replyText="Right"
        replyQuestion={mockReplyQuestion}
        givePoint={mockGivePoint}
      />
    );

    click(screen.getByText("Right"));
    expect(mockReplyQuestion).toHaveBeenCalledTimes(1);
    expect(mockGivePoint).toHaveBeenCalledTimes(1);
  });
});
