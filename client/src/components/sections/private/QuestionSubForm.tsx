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

const ComplexInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StyledUploadedReplies = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
`;

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
        <li key={index}>R: {reply}</li>
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
  const [allReplies, setAllReplies] = useState<string[]>([]);
  const [rightReply, setRightReply] = useState("");

  const handleSubmit = () => {
    const questionToSave = new PrivateQuizQuestion(
      question,
      allReplies,
      rightReply
    );
    console.log("Now saving", questionToSave);
    saveQuestionInState(questionToSave);
    closeItself();
  };

  return (
    <Modal>
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
              <SmallButton onClick={() => setHasEnteredQuestion(true)}>
                Load
              </SmallButton>
            </ComplexInputContainer>
          )}

          {!hasEnteredRightReply && (
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
                  setHasEnteredRightReply(true);
                }}
              >
                Load
              </SmallButton>
            </ComplexInputContainer>
          )}

          {allReplies.length > 0 && <UploadedReplies replies={allReplies} />}
          {hasEnteredRightReply && <h5>Right reply: {rightReply}</h5>}

          <ComplexInputContainer>
            <QuestionInput
              value={currentReply}
              label="Add a (wrong) reply"
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setCurrentReply(e.target.value)
              }
            />

            <SmallButton
              onClick={() => {
                setAllReplies(prevReplies => [...prevReplies, currentReply]);
                setCurrentReply("");
              }}
            >
              Add
            </SmallButton>
          </ComplexInputContainer>
          <SubmitButton type="submit" onClick={handleSubmit}>
            SAVE QUESTION
          </SubmitButton>
        </form>
      </FormContainer>
    </Modal>
  );
};
