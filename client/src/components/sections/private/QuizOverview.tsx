import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";
import { GridWrapper } from "../../UI/GridWrapper";
import { MyQuizCard } from "./MyQuizCard";
import { QuizCreationOrEditForm } from "./quizForm/QuizCreationOrEditForm";
import { Modal } from "../../UI/Modal";
import { AuthContext } from "../../../contexts/auth/Auth";

interface Props {
  myQuizzes: PrivateQuiz[];
}

const Wrapper = styled(GridWrapper)`
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const QuizOverview: React.FC<Props> = ({ myQuizzes }) => {
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [quizNowEditing, setQuizNowEditing] = useState<PrivateQuiz | null>(
    null
  );
  const { userQuizzes } = useContext(AuthContext);

  console.log("OVERVIEW USER QUIZZES", userQuizzes);

  const startEditingQuiz = (quiz: PrivateQuiz) => {
    setQuizNowEditing(quiz);
    setIsEditingQuiz(true);
  };

  return (
    <>
      {isEditingQuiz && (
        <Modal handleClose={() => setIsEditingQuiz(false)}>
          <QuizCreationOrEditForm
            usage="editing"
            currentQuiz={quizNowEditing as PrivateQuiz}
            onFormClose={() => setIsEditingQuiz(false)}
          />
        </Modal>
      )}
      <BigTitle>Your quizzes</BigTitle>
      <Wrapper>
        {myQuizzes.map((quiz, index) => (
          <MyQuizCard quiz={quiz} key={index} editQuiz={startEditingQuiz} />
        ))}
      </Wrapper>
    </>
  );
};
