import React from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";
import { GridWrapper } from "../../UI/GridWrapper";
import { MyQuizCard } from "./MyQuizCard";
import { Link } from "react-router-dom";

interface Props {
  myQuizzes: PrivateQuiz[];
}

const Wrapper = styled(GridWrapper)`
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const QuizOverview: React.FC<Props> = ({ myQuizzes }) => {
  return (
    <>
      <BigTitle>Your quizzes</BigTitle>
      <Wrapper>
        {myQuizzes.map((quiz, index) => (
          <Link key={index} to={`/quiz/${quiz._id}`}>
            <MyQuizCard quiz={quiz} />
          </Link>
        ))}
      </Wrapper>
    </>
  );
};
