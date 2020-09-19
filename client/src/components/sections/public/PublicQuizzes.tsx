import React, { useContext, useEffect } from "react";
import { Subject } from "../../../models/PublicQuizQuestion";
import { NumQuestionsStep } from "./optionSteps/NumQuestionsStep";
import { DifficultyStep } from "./optionSteps/DifficultyStep";
import { SubjectsStep } from "./optionSteps/SubjectsStep";
import { FinalSummaryStep } from "./optionSteps/FinalSummaryStep";
import { ActualQuiz } from "./ActualPublicQuiz";
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
