import React from "react";
import { StyledAnswer } from "./Styled";
import { Colors } from "../../../../../constants/colors";
import {
  cropInput,
  removeEntryFromArray
} from "../../../../../utils/functions";
import { Icon } from "../../../../UI/Icon";
import { StyledUploadedReplies } from "./Styled";
import { FlexRow } from "../../../../UI/FlexRow";
import { Clickable } from "../../../../UI/Clickable";

interface Props {
  label: string;
  value: string;
  isRight: boolean;
  handleDelete: () => void;
}

export const Answer: React.FC<Props> = ({
  label,
  value,
  isRight,
  handleDelete
}) => {
  return (
    <StyledAnswer>
      <FlexRow>
        <Icon
          icon={isRight ? "thumbs-up" : "thumbs-down"}
          color={isRight ? Colors.GREEN : Colors.RED}
        />{" "}
        <h5>
          <span style={{ color: Colors.LIGHTEST_GREY, marginRight: 5 }}>
            {label}
          </span>
          {cropInput(value, 50)}
        </h5>
      </FlexRow>
      <Clickable onClick={handleDelete}>
        <Icon icon="times-circle" />
      </Clickable>
    </StyledAnswer>
  );
};

export const UploadedAnswers: React.FC<{
  replies: string[];
  updateAnswersOnDelete: (answersLeft: string[]) => void;
}> = ({ replies, updateAnswersOnDelete }) => {
  const onDelete = (answer: string) => {
    const answersLeft = removeEntryFromArray(replies, answer);
    updateAnswersOnDelete(answersLeft);
  };
  return (
    <StyledUploadedReplies>
      {replies.map((reply, index) => (
        <li key={index}>
          <Answer
            label="A: "
            isRight={false}
            value={reply}
            handleDelete={() => onDelete(reply)}
          />
        </li>
      ))}
    </StyledUploadedReplies>
  );
};
