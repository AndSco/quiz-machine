import React, { useReducer, useState, useContext } from "react";
import styled from "styled-components";
import {
  QuizCreationReducer,
  QuizCreationStartingValues,
  QuizCreationAction,
  InputName
} from "../../../reducers/QuizCreation";
import {
  Input,
  StyledLabel,
  Container as InputContainer
} from "../../UI/Input";
import { FormContainer, FormTitle, SubmitButton } from "../../UI/Form";
import { Colors } from "../../../constants/colors";
import {
  PrivateQuizQuestion,
  PrivacyChoice
} from "../../../models/PrivateQuiz";
import { QuestionSubForm } from "./QuestionSubForm";
import { createQuiz } from "../../../utils/dbFunctions";
import { AuthContext } from "../../../contexts/auth/Auth";
import { ApiResponse } from "../../../models/ApiResponse";
import { SavedQuestionCard } from "./SavedQuestionCard";
import { Icon } from "../../UI/Icon";
import { capitaliseInput } from "../../../utils/functions";

const RadioButtonsContainer = styled.div`
  display: flex;
  margin: 0.5rem 0 1rem 0;
`;

const RadioContainer = styled.div`
  display: flex;
  margin: 0 1rem;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? Colors.ORANGE : Colors.LIGHTEST_GREY};
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "white" : "grey"};
  padding: 0.4rem 0.9rem 0.4rem 0.6rem;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;

  label {
    padding-left: 6px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  input {
    margin: 0;
    display: none;
  }
`;

const AddQuestionButton = styled.h4`
  color: ${Colors.STEEL_PINK_2};
  background-color: white;
  padding: 0.5rem;
  border-radius: 40px;
  margin: 2.5rem;
  cursor: pointer;
  font-size: 1rem;

  :hover {
    color: white;
    background-color: ${Colors.STEEL_PINK_2};
  }
`;

export const QuizCreationForm: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [inputValues, dispatch] = useReducer(
    QuizCreationReducer,
    QuizCreationStartingValues
  );
  const [uploadMessage, setUploadMessage] = useState("");

  console.log(inputValues);

  const handleChange = (input: string, inputName: InputName) => {
    dispatch({ type: inputName, payload: input });
  };

  const handleSubmit = async () => {
    const quizCreated = { ...inputValues };
    quizCreated.title = capitaliseInput(quizCreated.title);
    console.log("QUIZ CREATED", quizCreated);
    const response = await createQuiz(quizCreated, currentUser!._id);
    setUploadMessage((response as ApiResponse).message as string);
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

  const closeQuestionForm = () => setIsAddingQuestions(false);

  return (
    <FormContainer>
      {isAddingQuestions && (
        <QuestionSubForm
          saveQuestionInState={saveQuestionInState}
          closeItself={closeQuestionForm}
        />
      )}

      {uploadMessage ? (
        <h2>{uploadMessage}</h2>
      ) : (
        <>
          <FormTitle>Create your quiz</FormTitle>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input inputName="title" onChangeFunction={handleChange} />
            <Input
              inputName="backgroundImageUrl"
              onChangeFunction={handleChange}
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

            {inputValues.questions.length > 0 &&
              inputValues.questions.map((question, index) => (
                <SavedQuestionCard key={index} question={question} />
              ))}

            <SubmitButton type="submit">SUBMIT</SubmitButton>
          </form>
        </>
      )}
    </FormContainer>
  );
};
