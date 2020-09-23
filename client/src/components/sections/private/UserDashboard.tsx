import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/auth/Auth";
import { useHistory } from "react-router-dom";
import { SecondaryButton } from "../../UI/Buttons";
import { QuizCreationOrEditForm } from "./quizForm/QuizCreationOrEditForm";
import { QuizOverview } from "./QuizOverview";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { Wrapper } from "../../UI/Wrapper";
import { Icon } from "../../UI/Icon";
import { Colors } from "../../../constants/colors";
import { Modal } from "../../UI/Modal";

const WelcomeMessage = styled.h1`
  color: ${Colors.BLACK};
`;

const CreateButtonContainer = styled.div`
  position: fixed;
  top: 90px;
  left: 30px;
`;

const StyledCreateButton = styled(SecondaryButton)`
  border-radius: 40px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 200px;

  :hover {
    border: none;
    background-color: ${Colors.INDIGO};
    svg {
      color: white;
    }
  }
`;

const CreateButton: React.FC<{ openCreationForm: () => void }> = ({
  openCreationForm
}) => {
  return (
    <CreateButtonContainer>
      <StyledCreateButton onClick={() => openCreationForm()}>
        Create quiz
        <Icon icon={"plus-circle"} color={Colors.LIGHTEST_GREY} size="3x" />
      </StyledCreateButton>
    </CreateButtonContainer>
  );
};

export const UserDashboard: React.FC = () => {
  const { currentUser, userQuizzes, goToPrivateSection } = useContext(
    AuthContext
  );
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const history = useHistory();

  useEffect(() => goToPrivateSection(), []);

  useEffect(() => {
    history.push("/myDashboard");
  }, [history]);

  const startCreatingQuiz = () => setIsCreatingQuiz(true);

  if (!currentUser) return null;

  return (
    <Wrapper>
      {!isCreatingQuiz ? (
        <>
          <WelcomeMessage>
            Welcome {currentUser!.username.toUpperCase()}
          </WelcomeMessage>
          <CreateButton openCreationForm={startCreatingQuiz} />
          {userQuizzes.length > 0 ? (
            <QuizOverview myQuizzes={userQuizzes as PrivateQuiz[]} />
          ) : (
            <h2 style={{ color: "black" }}>No quizzes yet. Create one now</h2>
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
    </Wrapper>
  );
};
