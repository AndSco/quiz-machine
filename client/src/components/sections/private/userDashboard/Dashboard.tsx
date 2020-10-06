import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth/Auth";
import { useHistory } from "react-router-dom";
import { PrivateQuiz } from "../../../../models/PrivateQuiz";
import { Wrapper } from "../../../UI/Wrapper";
import { fadeIn } from "../../../../constants/animations";
import { CreationForm } from "./CreationForm";
import { EditForm } from "./EditForm";
import { ActualDashboard } from "./ActualDashboard";

const FadeInWrapper = styled(Wrapper)`
  animation: ${fadeIn} 1.2s ease;
`;

export const Dashboard: React.FC = () => {
  const { currentUser, userQuizzes, goToPrivateSection } = useContext(
    AuthContext
  );
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [quizNowEditing, setQuizNowEditing] = useState<PrivateQuiz | null>(
    null
  );

  const history = useHistory();

  const stopQuizCreation = () => setIsCreatingQuiz(false);
  const startQuizCreation = () => setIsCreatingQuiz(true);
  const stopQuizEditing = () => setIsEditingQuiz(false);
  const startQuizEditing = (quiz: PrivateQuiz) => {
    setIsEditingQuiz(true);
    setQuizNowEditing(quiz);
  };

  useEffect(() => goToPrivateSection(), [goToPrivateSection]);

  useEffect(() => {
    history.push("/myDashboard");
  }, [history]);

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [history, currentUser]);

  if (!currentUser) return null;

  return (
    <FadeInWrapper>
      {isCreatingQuiz ? (
        <CreationForm onStopQuizCreation={stopQuizCreation} />
      ) : isEditingQuiz ? (
        <EditForm
          onStopQuizEditing={stopQuizEditing}
          quizEditing={quizNowEditing}
        />
      ) : (
        <ActualDashboard
          username={currentUser.username}
          userQuizzes={userQuizzes}
          createNewQuiz={startQuizCreation}
          editQuiz={startQuizEditing}
        />
      )}
    </FadeInWrapper>
  );
};
