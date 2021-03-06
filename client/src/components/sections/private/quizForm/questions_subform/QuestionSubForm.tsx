import React, { useState } from "react";
import { PrivateQuizQuestion } from "../../../../../models/PrivateQuiz";
import { FormContainer } from "../../../../UI/Form";
import { ResetButton, IntermediateButton } from "../../../../UI/Buttons";
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
import { Icon } from "../../../../UI/Icon";
import { Colors } from "../../../../../constants/colors";
import { CustomFormTitle } from "../QuizCreationOrEditForm";

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
    <FormContainer background={Colors.LAVENDER} color="white">
      <CustomFormTitle>
        {!hasEnteredQuestion
          ? "Add a question to your quiz"
          : "enter the answers to the question"}
      </CustomFormTitle>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        {hasEnteredQuestion ? (
          <UploadedQuestionPreview>
            <Icon icon="question-circle" color={Colors.LIGHTER_GREY} />{" "}
            {question}
          </UploadedQuestionPreview>
        ) : (
          <ComplexInputContainer>
            <CustomInput
              label="ENTER THE QUESTION"
              value={question}
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setQuestion(e.target.value)
              }
            />

            {!needsToAddCode ? (
              <Clickable onClick={() => setNeedsToAddCode(true)}>
                <AddCodeButton>
                  <Icon icon="code" color={Colors.TERMINAL_GREEN} />
                  Need to add code to this question? Click here to add a code
                  snippet
                </AddCodeButton>
              </Clickable>
            ) : (
              <CustomInput
                label="ADD CODE SNIPPET"
                handleChangeFunction={(
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ) => setCode(e.target.value)}
                value={code}
                isTextArea={true}
              />
            )}

            <IntermediateButton
              isShowing={question.length > 0}
              onClick={() => {
                if (!checkMinimumInputLength(question, 4)) {
                  alert("Enter a valid question");
                  return;
                }
                setQuestion(prev => capitaliseInput(prev));
                setHasEnteredQuestion(true);
              }}
            >
              Next
              <Icon icon="chevron-right" color={Colors.LIGHTEST_GREY} />
            </IntermediateButton>
          </ComplexInputContainer>
        )}

        {!hasEnteredRightReply && hasEnteredQuestion && (
          <ComplexInputContainer>
            <CustomInput
              value={rightReply}
              label="ENTER THE CORRECT ANSWER"
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setRightReply(e.target.value)
              }
              needsProgress={true}
              onProgressHandler={() => {
                if (!checkMinimumInputLength(rightReply)) {
                  alert("Enter a valid answer");
                  return;
                }
                setRightReply(prev => prev);
                setHasEnteredRightReply(true);
              }}
            />
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
              label={`ADD ${
                allReplies.length > 0 ? "ANOTHER" : "A"
              } (WRONG) ANSWER`}
              handleChangeFunction={(e: React.ChangeEvent<HTMLFormElement>) =>
                setCurrentReply(e.target.value)
              }
              needsProgress={true}
              onProgressHandler={() => {
                if (!checkMinimumInputLength(currentReply)) {
                  alert("Enter a valid reply");
                  return;
                }
                setAllReplies(prevReplies => [...prevReplies, currentReply]);
                setCurrentReply("");
              }}
            />
          </ComplexInputContainer>
        )}

        {hasEnteredQuestion && hasEnteredRightReply && allReplies.length > 0 && (
          <PinkSubmitButton type="submit" onClick={handleSubmit}>
            SAVE QUESTION
          </PinkSubmitButton>
        )}
        <ResetButton onClick={closeItself}>Back</ResetButton>
      </form>
    </FormContainer>
  );
};
