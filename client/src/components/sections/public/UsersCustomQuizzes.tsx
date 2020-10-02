import React, { useContext } from "react";
import { BigTitle, SubTitle } from "../../UI/Titles";
import { QuizzesContext } from "../../../contexts/quizzes/Quizzes";
import { GridWrapper } from "../../UI/GridWrapper";
import { FingerDown } from "../../UI/FingerDown";
import { Thumbnail } from "../../UI/Thumbnail";
import { Colors } from "../../../constants/colors";

export const UsersCustomQuizzes: React.FC = () => {
  const { usersCustomQuizzes } = useContext(QuizzesContext);
  return (
    <>
      <BigTitle>USERS' QUIZZES</BigTitle>
      {usersCustomQuizzes.length === 0 ? (
        <h2 style={{ color: Colors.LIGHTER_GREY }}>
          Users didn't create quizzes yet...
        </h2>
      ) : (
        <>
          <SubTitle>
            Try a quiz created by a fellow user <FingerDown />
          </SubTitle>

          <GridWrapper>
            {usersCustomQuizzes
              .sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
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
      )}
    </>
  );
};
