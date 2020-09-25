import React, { useReducer, useState, useContext } from "react";
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
import { QuizzesContext } from "../../../../contexts/quizzes/Quizzes";
import { ApiResponse } from "../../../../models/ApiResponse";
import { SavedQuestionCard } from "./SavedQuestionCard";
import { Icon } from "../../../UI/Icon";
import { capitaliseInput, getPropertyName } from "../../../../utils/functions";
import {
  AddQuestionButton,
  RadioButtonsContainer,
  RadioContainer,
  ToggleQuestionVisibilityButton,
  FormButton
} from "./Styled";

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
  const { getCustomQuizzes } = useContext(QuizzesContext);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [inputValues, dispatch] = useReducer(
    QuizCreationReducer,
    usage === "creation"
      ? QuizCreationStartingValues
      : (currentQuiz as PrivateQuiz)
  );
  const [uploadMessage, setUploadMessage] = useState("");
  const [showUploadedQuestions, setShowUploadedQuestions] = useState(false);

  const handleChange = (input: string, inputName: InputName) => {
    dispatch({ type: inputName, payload: input });
  };

  const handleSubmit = async () => {
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
    getCustomQuizzes();
    onFormClose();
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
    <FormContainer>
      {isAddingQuestions ? (
        <QuestionSubForm
          saveQuestionInState={saveQuestionInState}
          closeItself={closeQuestionForm}
        />
      ) : uploadMessage ? (
        <h2>{uploadMessage}</h2>
      ) : (
        <>
          <FormTitle>
            {usage === "creation" ? "Create" : "Edit"} your quiz
          </FormTitle>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              inputName="title"
              label="quiz title"
              onChangeFunction={handleChange}
              value={getPropertyName(inputValues, "title")}
            />
            <Input
              inputName="backgroundImageUrl"
              label="image background url"
              onChangeFunction={handleChange}
              value={getPropertyName(inputValues, "backgroundImageUrl" as any)}
            />

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
                  <label htmlFor="yes">Keep private</label>
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
                  <label htmlFor="no">Make public</label>
                </RadioContainer>
              </RadioButtonsContainer>
            </InputContainer>
            <AddQuestionButton onClick={() => setIsAddingQuestions(true)}>
              <Icon icon={"plus-circle"} />
              Add a question
            </AddQuestionButton>

            {inputValues.questions.length > 0 && (
              <ToggleQuestionVisibilityButton
                onClick={() => setShowUploadedQuestions(prev => !prev)}
              >
                {showUploadedQuestions ? "Hide" : "Show"} uploaded questions
              </ToggleQuestionVisibilityButton>
            )}
            {showUploadedQuestions &&
              inputValues.questions.map((question, index) => (
                <SavedQuestionCard
                  key={index}
                  question={question}
                  removeQuestion={deleteQuestionFromState}
                />
              ))}

            <FormButton type="submit">SUBMIT</FormButton>
          </form>
        </>
      )}
    </FormContainer>
  );
};
