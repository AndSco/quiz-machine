import React from "react";
import { StyledAnswer } from "./Styled";
import { Colors } from "../../../../../constants/colors";
import { cropInput } from "../../../../../utils/functions";
import { Icon } from "../../../../UI/Icon";
import { StyledUploadedReplies } from "./Styled";

export const Answer: React.FC<{
  label: string;
  value: string;
  isRight: boolean;
}> = ({ label, value, isRight }) => {
  return (
    <StyledAnswer>
      <Icon
        icon={isRight ? "check-circle" : "times-circle"}
        color={isRight ? Colors.GREEN : Colors.RED}
      />{" "}
      <h5>
        <span style={{ color: Colors.LIGHTEST_GREY, marginRight: 5 }}>
          {label}
        </span>
        {cropInput(value, 50)}
      </h5>
    </StyledAnswer>
  );
};

export const UploadedAnswers: React.FC<{ replies: string[] }> = ({
  replies
}) => {
  return (
    <StyledUploadedReplies>
      {replies.map((reply, index) => (
        <li key={index}>
          <Answer label="A: " isRight={false} value={reply} />
        </li>
      ))}
    </StyledUploadedReplies>
  );
};
