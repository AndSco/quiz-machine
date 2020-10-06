import React, { useReducer, useState, useContext } from "react";
import styled from "styled-components";
import {
  QuizCreationReducer,
  QuizCreationStartingValues,
  QuizCreationAction,
  InputName
} from "../../../../reducers/QuizCreation";
import {
  Input,
  StyledLabel,
  Container as InputContainer
} from "../../../UI/Input";
import { FormContainer, FormTitle } from "../../../UI/Form";
import {
  PrivateQuizQuestion,
  PrivacyChoice,
  PrivateQuiz
} from "../../../../models/PrivateQuiz";
import { QuestionSubForm } from "./questions_subform/QuestionSubForm";
import { createQuiz, editQuiz } from "../../../../utils/dbFunctions";
import { AuthContext } from "../../../../contexts/auth/Auth";
import { ApiResponse } from "../../../../models/ApiResponse";
import { SavedQuestionCard } from "./SavedQuestionCard";
import { Icon } from "../../../UI/Icon";
import { capitaliseInput, getPropertyName } from "../../../../utils/functions";
import { RadioButtonsContainer, RadioContainer, FormButton } from "./Styled";
import { BackgroundImagePreview } from "./BackgroundImagePreview";
import { Colors } from "../../../../constants/colors";
import { IntermediateButton } from "../../../UI/Buttons";

export const CustomFormTitle = styled(FormTitle)`
  background-color: ${Colors.DARK_BLUE};
  padding: 0.5rem;
`;

export type PossibleUsage = "creation" | "editing";

interface Props {
  usage: PossibleUsage;
  currentQuiz?: PrivateQuiz;
  onFormClose: () => void;
}

export const QuizCreationOrEditForm: React.FC<Props> = ({
  usage,
  currentQuiz,
  onFormClose
}) => {
  const { currentUser, refreshUserQuizzes } = useContext(AuthContext);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [inputValues, dispatch] = useReducer(
    QuizCreationReducer,
    usage === "creation"
      ? QuizCreationStartingValues
      : (currentQuiz as PrivateQuiz)
  );
  const [uploadMessage, setUploadMessage] = useState("");
  const [wantsToChangeBackground, setWantsToChangeBackground] = useState(false);

  const startChangingBackground = () => setWantsToChangeBackground(true);

  const handleChange = (input: string, inputName: InputName) => {
    dispatch({ type: inputName, payload: input });
  };

  const handleSubmit = async () => {
    try {
      const quizGenerated = { ...inputValues };
      quizGenerated.title = capitaliseInput(quizGenerated.title);
      if (quizGenerated.questions.length < 1) {
        alert("You cannot create a quiz without questions!");
        return;
      }

      if (usage === "editing") {
        await editQuiz(currentQuiz!._id as string, quizGenerated);
      } else {
        const response = await createQuiz(quizGenerated, currentUser!._id);
        setUploadMessage((response as ApiResponse).message as string);
      }
      refreshUserQuizzes();
      onFormClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRadioButtonChange = (choice: PrivacyChoice) => {
    const actionToDispatch: QuizCreationAction = {
      type: "isPrivate",
      payload: false
    };
    if (choice === "yes") {
      actionToDispatch.payload = true;
    }
    dispatch(actionToDispatch);
  };

  const saveQuestionInState = (question: PrivateQuizQuestion) =>
    dispatch({ type: "questions", payload: question });

  const deleteQuestionFromState = (questionText: string) => {
    dispatch({ type: "questions", payload: questionText });
  };

  const closeQuestionForm = () => setIsAddingQuestions(false);

  return (
    <FormContainer background={Colors.LAVENDER} color="white">
      {isAddingQuestions ? (
        <QuestionSubForm
          saveQuestionInState={saveQuestionInState}
          closeItself={closeQuestionForm}
        />
      ) : uploadMessage ? (
        <h2>{uploadMessage}</h2>
      ) : (
        <>
          <CustomFormTitle>
            {usage === "creation" ? "Create" : "Edit"} your quiz
          </CustomFormTitle>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              inputName="title"
              label="QUIZ TITLE"
              onChangeFunction={handleChange}
              value={getPropertyName(inputValues, "title")}
            />
            {wantsToChangeBackground ? (
              <Input
                inputName="backgroundImageUrl"
                label="image background url"
                onChangeFunction={handleChange}
                value={getPropertyName(
                  inputValues,
                  "backgroundImageUrl" as any
                )}
                onBlurFunction={() => setWantsToChangeBackground(false)}
              />
            ) : (
              <BackgroundImagePreview
                changeBackground={startChangingBackground}
                imageUrl={inputValues.backgroundImageUrl as string}
              />
            )}

            <InputContainer>
              <StyledLabel>
                {"What do you want to do with this quiz?".toUpperCase()}
              </StyledLabel>
              <RadioButtonsContainer>
                <RadioContainer isSelected={inputValues.isPrivate}>
                  <input
                    type="radio"
                    id="yes"
                    name="isPrivate"
                    value="yes"
                    onChange={e =>
                      handleRadioButtonChange(e.target.value as PrivacyChoice)
                    }
                  />
                  <label htmlFor="yes">Keep it private</label>
                </RadioContainer>
                <RadioContainer isSelected={!inputValues.isPrivate}>
                  <input
                    type="radio"
                    id="no"
                    name="isPrivate"
                    value="no"
                    onChange={e =>
                      handleRadioButtonChange(e.target.value as PrivacyChoice)
                    }
                  />
                  <label htmlFor="no">Share it with other users</label>
                </RadioContainer>
              </RadioButtonsContainer>
            </InputContainer>

            {inputValues.questions.length > 0 &&
              inputValues.questions.map((question, index) => (
                <SavedQuestionCard
                  key={index}
                  question={question}
                  removeQuestion={deleteQuestionFromState}
                />
              ))}

            <IntermediateButton
              isShowing={inputValues.title.length > 0}
              onClick={() => setIsAddingQuestions(true)}
            >
              <Icon icon={"plus-circle"} />
              Add {inputValues.questions.length === 0 ? "a" : "another"}{" "}
              question
            </IntermediateButton>

            {inputValues.questions.length > 0 &&
              inputValues.title.length > 0 && (
                <FormButton type="submit">
                  {usage === "creation" ? "SAVE QUIZ" : "EDIT QUIZ"}
                </FormButton>
              )}
          </form>
        </>
      )}
    </FormContainer>
  );
};
