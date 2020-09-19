import React, { useState } from "react";
import styled from "styled-components";
import { PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { FormContainer, FormTitle, SubmitButton } from "../../UI/Form";
import {
  StyledInput,
  Container as InputContainer,
  StyledLabel
} from "../../UI/Input";
import { SmallButton } from "../../UI/Buttons";
import { Modal } from "../../UI/Modal";
import { shuffleArray, capitaliseInput } from "../../../utils/functions";
import { Colors } from "../../../constants/colors";
import { Icon } from "../../UI/Icon";

const ComplexInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
`;

const StyledUploadedReplies = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
`;

const PinkSubmitButton = styled(SubmitButton)`
  background-color: ${Colors.STEEL_PINK};
`;

const StyledAnswer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 1rem;
  border-radius: 40px;
  font-size: 0.8rem;
  text-align: left;
  margin: 0.6rem 0;
`;

const Answer: React.FC<{ label: string; value: string; isRight: boolean }> = ({
  label,
  value,
  isRight
}) => {
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
        {value}
      </h5>
    </StyledAnswer>
  );
};

const QuestionInput: React.FC<{
  label: string;
  handleChangeFunction: any;
  value: string;
}> = ({ label, handleChangeFunction, value }) => {
  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type="text" onChange={handleChangeFunction} value={value} />
    </InputContainer>
  );
};

const UploadedReplies: React.FC<{ replies: string[] }> = ({ replies }) => {
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

interface Props {
  saveQuestionInState: (question: PrivateQuizQuestion) => void;
  closeItself: () => void;
}

export const QuestionSubForm: React.FC<Props> = ({
  saveQuestionInState,
  closeItself
}) => {
  const [question, setQuestion] = useState("");
  const [hasEnteredQuestion, setHasEnteredQuestion] = useState(false);
  const [hasEnteredRightReply, setHasEnteredRightReply] = useState(false);
  const [currentReply, setCurrentReply] = useState("");
  const [rightReply, setRightReply] = useState("");
  const [allReplies, setAllReplies] = useState<string[]>([]);

  const handleSubmit = () => {
    const wrongAndRightReplies = shuffleArray<string>([
      ...allReplies,
      rightReply
    ]);
    const questionToSave = new PrivateQuizQuestion(
      question,
      wrongAndRightReplies,
      rightReply
    );
    console.log("Now saving", questionToSave);
    saveQuestionInState(questionToSave);
    closeItself();
  };

  return (
    <Modal handleClose={closeItself}>
      <FormContainer>
        <FormTitle>Add a question to your quiz</FormTitle>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
        >
          {hasEnteredQuestion ? (
            <h3>Q: {question}</h3>
          ) : (
            <ComplexInputContainer>
              <QuestionInput
                label="Question"
                value={question}
                handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                  setQuestion(e.target.value)
                }
              />
              <SmallButton
                onClick={() => {
                  setQuestion(prev => capitaliseInput(prev));
                  setHasEnteredQuestion(true);
                }}
              >
                Load
              </SmallButton>
            </ComplexInputContainer>
          )}

          {!hasEnteredRightReply && hasEnteredQuestion && (
            <ComplexInputContainer>
              <QuestionInput
                value={rightReply}
                label="Add the right reply"
                handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                  setRightReply(e.target.value)
                }
              />

              <SmallButton
                onClick={() => {
                  setRightReply(prev => capitaliseInput(prev));
                  setHasEnteredRightReply(true);
                }}
              >
                Load
              </SmallButton>
            </ComplexInputContainer>
          )}

          {hasEnteredRightReply && (
            <Answer
              label="Correct answer: "
              value={rightReply}
              isRight={true}
            />
          )}
          {allReplies.length > 0 && <UploadedReplies replies={allReplies} />}

          {hasEnteredQuestion && hasEnteredRightReply && (
            <ComplexInputContainer>
              <QuestionInput
                value={currentReply}
                label="Add a (wrong) answer"
                handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                  setCurrentReply(e.target.value)
                }
              />

              <SmallButton
                onClick={() => {
                  setAllReplies(prevReplies => [
                    ...prevReplies,
                    capitaliseInput(currentReply)
                  ]);
                  setCurrentReply("");
                }}
              >
                Add
              </SmallButton>
            </ComplexInputContainer>
          )}

          <PinkSubmitButton type="submit" onClick={handleSubmit}>
            SAVE QUESTION
          </PinkSubmitButton>
        </form>
      </FormContainer>
    </Modal>
  );
};
