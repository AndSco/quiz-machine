import React, { useContext } from "react";
import { BigTitle, SubTitle } from "../../UI/Titles";
import { QuizzesContext } from "../../../contexts/quizzes/Quizzes";
import { GridWrapper } from "../../UI/GridWrapper";
import { FingerDown } from "../../UI/FingerDown";
import { Thumbnail } from "../../UI/Thumbnail";

export const UsersCustomQuizzes: React.FC = () => {
  const { usersCustomQuizzes } = useContext(QuizzesContext);
  return (
    <>
      <BigTitle>USERS' QUIZZES</BigTitle>
      <SubTitle>
        Try a quiz created by a fellow user <FingerDown />
      </SubTitle>
      <GridWrapper>
        {usersCustomQuizzes
          .sort((a, b) => {
            if (a! < b!) {
              return -1;
            }
            if (a! > b!) {
              return 1;
            }
            return 0;
          })
          .map(quiz => (
            <Thumbnail
              purpose="userQuizzes"
              key={quiz.title}
              title={quiz.title}
              customQuiz={quiz}
            />
          ))}
      </GridWrapper>
    </>
  );
};
