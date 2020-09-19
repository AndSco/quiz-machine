import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/auth/Auth";
import { useHistory } from "react-router-dom";
import { SecondaryButton } from "../../UI/Buttons";
import { QuizCreationForm } from "./QuizCreationForm";
import { QuizOverview } from "./QuizOverview";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";
import { Wrapper } from "../../UI/Wrapper";
import { Icon } from "../../UI/Icon";
import { Colors } from "../../../constants/colors";

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
        Create new quiz
        <Icon icon={"plus-circle"} color={Colors.LIGHTEST_GREY} />
      </StyledCreateButton>
    </CreateButtonContainer>
  );
};

export const UserDashboard: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const history = useHistory();

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
          <QuizOverview myQuizzes={currentUser.quizzes as PrivateQuiz[]} />
        </>
      ) : (
        <QuizCreationForm />
      )}
    </Wrapper>
  );
};
