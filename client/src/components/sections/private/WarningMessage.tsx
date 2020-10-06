import React, { useContext } from "react";
import styled from "styled-components";
import { SmallButton } from "../../UI/Buttons";
import { deleteQuiz } from "../../../utils/dbFunctions";
import { AuthContext } from "../../../contexts/auth/Auth";

export const StyledWarningMessage = styled.div`
  width: 100%;
  height: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: initial;
  background-color: rgba(74, 74, 74, 0.7);
  border-radius: 10px;

  h5 {
    margin-bottom: 0;
  }

  .buttons-container {
    width: 50%;
    min-width: 290px;
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
`;

interface Props {
  cancelDeletionProcess: () => void;
  quizId: string;
}

export const WarningMessage: React.FC<Props> = ({
  cancelDeletionProcess,
  quizId
}) => {
  const { refreshUserQuizzes } = useContext(AuthContext);

  const handleQuizDeletion = async () => {
    await deleteQuiz(quizId);
    refreshUserQuizzes();
    cancelDeletionProcess();
  };

  return (
    <StyledWarningMessage>
      <h5>Sure you want to continue?</h5>
      <p> This will delete your quiz forever </p>
      <div className="buttons-container">
        <SmallButton onClick={handleQuizDeletion}>Yes</SmallButton>
        <SmallButton onClick={cancelDeletionProcess}>Cancel</SmallButton>
      </div>
    </StyledWarningMessage>
  );
};
