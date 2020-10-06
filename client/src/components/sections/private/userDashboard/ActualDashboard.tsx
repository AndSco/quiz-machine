import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/colors";
import { PrivateQuiz } from "../../../../models/PrivateQuiz";
import { MyQuizzesList } from "./MyQuizzesList";
import { NoQuizzesMessage } from "./NoQuizzesMessage";

const WelcomeMessage = styled.h1`
  color: ${Colors.BLACK};
`;

interface Props {
  username: string;
  userQuizzes: PrivateQuiz[];
  createNewQuiz: () => void;
  editQuiz: (quiz: PrivateQuiz) => void;
}

export const ActualDashboard: React.FC<Props> = ({
  username,
  userQuizzes,
  createNewQuiz,
  editQuiz
}) => {
  return (
    <>
      <WelcomeMessage>Welcome {username.toUpperCase()}</WelcomeMessage>
      {userQuizzes.length > 0 ? (
        <MyQuizzesList
          myQuizzes={userQuizzes}
          startCreatingQuiz={createNewQuiz}
          startEditingQuiz={editQuiz}
        />
      ) : (
        <NoQuizzesMessage startCreatingQuiz={createNewQuiz} />
      )}
    </>
  );
};
