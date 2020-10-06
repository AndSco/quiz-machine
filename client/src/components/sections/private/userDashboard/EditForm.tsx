import React from "react";
import { Modal } from "../../../UI/Modal";
import { QuizCreationOrEditForm } from ".././quizForm/QuizCreationOrEditForm";
import { PrivateQuiz } from "../../../../models/PrivateQuiz";

interface Props {
  onStopQuizEditing: () => void;
  quizEditing: PrivateQuiz | null;
}

export const EditForm: React.FC<Props> = ({
  onStopQuizEditing,
  quizEditing
}) => {
  return (
    <Modal handleClose={onStopQuizEditing}>
      <QuizCreationOrEditForm
        usage="editing"
        currentQuiz={quizEditing as PrivateQuiz}
        onFormClose={onStopQuizEditing}
      />
    </Modal>
  );
};
