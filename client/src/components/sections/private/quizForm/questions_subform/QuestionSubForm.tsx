import React, { useState } from "react";
import { PrivateQuizQuestion } from "../../../../../models/PrivateQuiz";
import { FormContainer, FormTitle } from "../../../../UI/Form";
import { SmallButton, ResetButton } from "../../../../UI/Buttons";
import {
  shuffleArray,
  capitaliseInput,
  checkMinimumInputLength
} from "../../../../../utils/functions";
import { Clickable } from "../../../../UI/Clickable";
import {
  AddCodeButton,
  ComplexInputContainer,
  PinkSubmitButton,
  UploadedQuestionPreview
} from "./Styled";
import { UploadedAnswers, Answer } from "./UploadedAnswers";
import { CustomInput } from "./CustomInput";

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
  const [needsToAddCode, setNeedsToAddCode] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    const wrongAndRightReplies = shuffleArray<string>([
      ...allReplies,
      rightReply
    ]);
    const questionToSave = new PrivateQuizQuestion(
      question,
      wrongAndRightReplies,
      rightReply,
      code
    );
    saveQuestionInState(questionToSave);
    closeItself();
  };

  const updateReplies = (updatedReplies: string[]) =>
    setAllReplies(updatedReplies);

  return (
    <FormContainer>
      <FormTitle>Add a question to your quiz</FormTitle>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        {hasEnteredQuestion ? (
          <UploadedQuestionPreview>Q: {question}</UploadedQuestionPreview>
        ) : (
          <ComplexInputContainer>
            <CustomInput
              label="Question"
              value={question}
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setQuestion(e.target.value)
              }
            />

            {!needsToAddCode ? (
              <Clickable onClick={() => setNeedsToAddCode(true)}>
                <AddCodeButton>
                  If your question involves code, click here to add a code
                  snippet
                </AddCodeButton>
              </Clickable>
            ) : (
              <CustomInput
                label="Add code"
                handleChangeFunction={(
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ) => setCode(e.target.value)}
                value={code}
                isTextArea={true}
              />
            )}
            <SmallButton
              onClick={() => {
                if (!checkMinimumInputLength(question, 4)) {
                  alert("Enter a valid question");
                  return;
                }
                setQuestion(prev => capitaliseInput(prev));
                setHasEnteredQuestion(true);
              }}
            >
              Continue
            </SmallButton>
          </ComplexInputContainer>
        )}

        {!hasEnteredRightReply && hasEnteredQuestion && (
          <ComplexInputContainer>
            <CustomInput
              value={rightReply}
              label="Add the right reply"
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setRightReply(e.target.value)
              }
            />

            <SmallButton
              onClick={() => {
                if (!checkMinimumInputLength(rightReply)) {
                  alert("Enter a valid reply");
                  return;
                }
                setRightReply(prev => capitaliseInput(prev));
                setHasEnteredRightReply(true);
              }}
            >
              Continue
            </SmallButton>
          </ComplexInputContainer>
        )}

        {hasEnteredRightReply && rightReply.length > 0 && (
          <Answer
            label="Correct answer: "
            value={rightReply}
            isRight={true}
            handleDelete={() => {
              setHasEnteredRightReply(false);
              setRightReply("");
            }}
          />
        )}
        {allReplies.length > 0 && (
          <UploadedAnswers
            replies={allReplies}
            updateAnswersOnDelete={updateReplies}
          />
        )}

        {hasEnteredQuestion && hasEnteredRightReply && (
          <ComplexInputContainer>
            <CustomInput
              value={currentReply}
              label="Add a (wrong) answer"
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setCurrentReply(e.target.value)
              }
            />

            <SmallButton
              onClick={() => {
                if (!checkMinimumInputLength(currentReply)) {
                  alert("Enter a valid reply");
                  return;
                }
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

        <ResetButton onClick={closeItself}>Cancel</ResetButton>

        {hasEnteredQuestion && hasEnteredRightReply && allReplies.length > 0 && (
          <PinkSubmitButton type="submit" onClick={handleSubmit}>
            SAVE QUESTION
          </PinkSubmitButton>
        )}
      </form>
    </FormContainer>
  );
};
