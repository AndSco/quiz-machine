import React, { useContext, useEffect } from "react";
import { Subject } from "../../../models/Question";
import { NumQuestionsStep } from "../../steps/NumQuestionsStep";
import { DifficultyStep } from "../../steps/DifficultyStep";
import { SubjectsStep } from "../../steps/SubjectsStep";
import { FinalSummaryStep } from "../../steps/FinalSummaryStep";
import { ActualQuiz } from "../../ActualQuiz";
import { QuizzesContext } from "../../../contexts/quizzes/Quizzes";
import { AuthContext } from "../../../contexts/auth/Auth";
import { Wrapper } from "../../UI/Wrapper";

export const PublicQuizzes: React.FC = () => {
  const {
    quizType,
    currentSubject,
    numberOfQuestions,
    difficultyLevel,
    quizConfigurationStep,
    startedQuiz,
    questions,
    reset
  } = useContext(QuizzesContext);

  const { goToPublicSection } = useContext(AuthContext);

  useEffect(() => {
    goToPublicSection();
  }, [goToPublicSection]);

  const renderInstruction = () => {
    switch (quizConfigurationStep) {
      case 1:
        return <SubjectsStep quizType={quizType} />;

      case 2:
        return <NumQuestionsStep currentAmount={numberOfQuestions} />;

      case 3:
        return <DifficultyStep currentLevel={difficultyLevel} />;

      case 4:
        return <FinalSummaryStep />;

      default:
        return <h1>SOMETHING WENT WRONG...</h1>;
    }
  };

  return !startedQuiz ? (
    <Wrapper>{renderInstruction()}</Wrapper>
  ) : (
    <ActualQuiz
      subject={currentSubject as Subject}
      allQuestions={questions}
      reset={reset}
    />
  );
};
