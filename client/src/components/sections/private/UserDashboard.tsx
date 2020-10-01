import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/auth/Auth";
import { useHistory } from "react-router-dom";
import { QuizCreationOrEditForm } from "./quizForm/QuizCreationOrEditForm";
import { QuizOverview } from "./QuizOverview";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { Wrapper } from "../../UI/Wrapper";
import { Colors } from "../../../constants/colors";
import { Modal } from "../../UI/Modal";
import { Clickable } from "../../UI/Clickable";
import { fadeIn } from "../../../constants/animations";

const FadeInWrapper = styled(Wrapper)`
  animation: ${fadeIn} 1.2s ease;
`;

const WelcomeMessage = styled.h1`
  color: ${Colors.BLACK};
`;

export const UserDashboard: React.FC = () => {
  const { currentUser, userQuizzes, goToPrivateSection } = useContext(
    AuthContext
  );
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const history = useHistory();

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
      {!isCreatingQuiz ? (
        <>
          <WelcomeMessage>
            Welcome {currentUser!.username.toUpperCase()}
          </WelcomeMessage>
          {userQuizzes.length > 0 ? (
            <QuizOverview myQuizzes={userQuizzes as PrivateQuiz[]} />
          ) : (
            <Clickable onClick={() => setIsCreatingQuiz(true)}>
              <h2
                style={{
                  border: `2px solid ${Colors.STEEL_PINK}`,
                  color: Colors.STEEL_PINK,
                  padding: ".7rem 1.4rem",
                  borderRadius: "40px"
                }}
              >
                No personal quizzes yet. Click here to start creating one!
              </h2>
            </Clickable>
          )}
        </>
      ) : (
        <Modal handleClose={() => setIsCreatingQuiz(false)}>
          <QuizCreationOrEditForm
            usage="creation"
            onFormClose={() => setIsCreatingQuiz(false)}
          />
        </Modal>
      )}
    </FadeInWrapper>
  );
};
