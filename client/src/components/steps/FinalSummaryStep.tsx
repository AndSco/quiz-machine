import React from "react";
import styled from "styled-components";
import { QuizType, Subject } from "../../models/Question";
import { Difficulty } from "../../models/TriviaApi";
import { Colors } from "../../constants/colors";
import { Question } from "../../models/Question";
import { getQuestions } from "../../utils/functions";
import { StepTemplate } from "./StepTemplate";
import { StyledButton } from "../QuizChoiceButton";

const StyledFeature = styled.p`
  color: white;
  font-size: 1rem;
  margin: 0.8rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: ${Colors.BLACK};
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 0.5rem;
  }
`;

const FeaturesContainer = styled.div`
  width: 50vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.YELLOW};
  justify-content: center;
  align-items: center;
`;

const StartButton = styled(StyledButton)`
  background-color: ${Colors.DARK_BLUE};
  margin: 0.5rem 0;
  width: 250px;

  :hover {
    background-color: ${Colors.ORANGE};
  }
`;

const StyledResetButton = styled(StartButton)`
  background-color: white;
  border: 1px solid ${Colors.LIGHTER_GREY};
  color: ${Colors.LIGHTER_GREY};

  :hover {
    background-color: ${Colors.ORANGE};
    color: white;
    border: 1px solid ${Colors.YELLOW};
  }
`;

const ResetButton: React.FC<{ reset: () => void }> = ({ reset }) => (
  <StyledResetButton onClick={reset}>RESET</StyledResetButton>
);

interface Props {
  quizType: QuizType;
  numberOfQuestions: number;
  difficulty: Difficulty;
  subject: Subject;
  uploadQuestions: (questions: Question[]) => void;
  reset: () => void;
}

export const FinalSummaryStep: React.FC<Props> = ({
  quizType,
  numberOfQuestions,
  difficulty,
  subject,
  uploadQuestions,
  reset
}) => {
  return (
    <StepTemplate>
      <FeaturesContainer>
        <StyledFeature>
          Quiz: <span>{quizType}</span>
        </StyledFeature>
        <StyledFeature>
          No. of questions: <span>{numberOfQuestions}</span>
        </StyledFeature>
        <StyledFeature>
          Difficulty: <span>{difficulty || "Any"}</span>
        </StyledFeature>
        <StyledFeature>
          Subject: <span>{subject || "Random"}</span>
        </StyledFeature>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem"
          }}
        >
          <StartButton
            onClick={async () => {
              const questionsToUpload = await getQuestions({
                quizType,
                difficulty,
                numOfQuestions: numberOfQuestions,
                subject
              });

              uploadQuestions(questionsToUpload);
            }}
          >
            START QUIZ
          </StartButton>
          <ResetButton reset={reset} />
        </div>
      </FeaturesContainer>
    </StepTemplate>
  );
};
