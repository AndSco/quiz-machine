import React, { useState } from "react";
import styled from "styled-components";
import { PrivateQuizQuestion } from "../../../../models/PrivateQuiz";
import { Icon } from "../../../UI/Icon";
import { Clickable } from "../../../UI/Clickable";
import { Colors } from "../../../../constants/colors";

const StyledQuestionCard = styled.div`
  border-radius: 10px;
  padding: 0.2rem 0.8rem;
  text-align: left;
  background-color: #e4e4e4;
  color: ${Colors.BLACK};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 90%;
  margin: 1rem auto;

  h4 {
    font-size: 0.8rem;
  }
`;

const DeleteConfirmation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const StyledDeleteConfirmationBtn = styled.h5`
  font-size: 0.8rem;
  color: ${Colors.BLACK};
  border-bottom: 1px solid;
`;

const DeleteConfirmationBtn: React.FC<{
  text: string;
  onClickFunction: () => void;
}> = ({ text, onClickFunction }) => {
  return (
    <Clickable onClick={onClickFunction}>
      <StyledDeleteConfirmationBtn>{text}</StyledDeleteConfirmationBtn>
    </Clickable>
  );
};

interface Props {
  question: PrivateQuizQuestion;
  removeQuestion: (questionText: string) => void;
}

export const SavedQuestionCard: React.FC<Props> = ({
  question,
  removeQuestion
}) => {
  const [wantsToRemoveQuestion, setWantsToRemoveQuestion] = useState(false);

  return (
    <StyledQuestionCard>
      {!wantsToRemoveQuestion ? (
        <>
          <h4>
            <Icon icon={"question-circle"} color={Colors.LIGHTER_GREY} />
            {question.question}
          </h4>
          <Clickable
            onClick={() => {
              setWantsToRemoveQuestion(true);
            }}
          >
            <Icon icon={"trash-alt"} color={Colors.BLACK} />
          </Clickable>
        </>
      ) : (
        <DeleteConfirmation>
          <h4>Delete this question and all its anwers?</h4>
          <DeleteConfirmationBtn
            text="Yes"
            onClickFunction={async () => {
              removeQuestion(question.question);
              setWantsToRemoveQuestion(false);
            }}
          />
          <DeleteConfirmationBtn
            text="No"
            onClickFunction={() => setWantsToRemoveQuestion(false)}
          />
        </DeleteConfirmation>
      )}
    </StyledQuestionCard>
  );
};
