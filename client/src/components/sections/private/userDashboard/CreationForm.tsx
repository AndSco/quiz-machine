import React from "react";
import { Modal } from "../../../UI/Modal";
import { QuizCreationOrEditForm } from ".././quizForm/QuizCreationOrEditForm";

interface Props {
  onStopQuizCreation: () => void;
}

export const CreationForm: React.FC<Props> = ({ onStopQuizCreation }) => {
  return (
    <Modal handleClose={onStopQuizCreation}>
      <QuizCreationOrEditForm
        usage="creation"
        onFormClose={onStopQuizCreation}
      />
    </Modal>
  );
};
