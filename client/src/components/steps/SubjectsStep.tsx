import React, { useContext } from "react";
import styled from "styled-components";
import { BigTitle, Title, SubTitle } from "../UI/Titles";
import { QuizType, Subject } from "../../models/Question";
import {
  shortenLengthySubjects,
  getSubjectBackgroundPic
} from "../../utils/functions";
import {
  ProgrammingCategories,
  TriviaCategories
} from "../../constants/questionCategories";
import { Colors } from "../../constants/colors";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";

const SubjectsContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 0 3rem;
  flex-wrap: wrap;
  justify-content: space-between;

  ::after {
    content: "";
    flex: auto;
  }
`;

const StyledSubject = styled.div`
  padding: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-transform: uppercase;
  background-color: ${Colors.DARK_BLUE};
  font-size: 1.6rem;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 2px;
  background-position: center;
  background-size: cover;

  :hover {
    transform: scale(1.02);

    h3 {
      background-color: ${Colors.YELLOW};
      color: white;
    }
  }
`;

const SubjectElement: React.FC<{ title: string; value: Subject }> = ({
  title,
  value
}) => {
  const { configQuiz, goToNextQuizConfiguration } = useContext(QuizzesContext);
  return (
    <StyledSubject
      onClick={() => {
        configQuiz("subject", value);
        goToNextQuizConfiguration();
      }}
      style={{ backgroundImage: `url("${getSubjectBackgroundPic(value)})"` }}
    >
      <Title>{title}</Title>
    </StyledSubject>
  );
};

interface Props {
  quizType: QuizType;
}

export const SubjectsStep: React.FC<Props> = ({ quizType }) => {
  const availableSubjects =
    quizType === QuizType.TRIVIA ? TriviaCategories : ProgrammingCategories;
  return (
    <>
      <BigTitle>{quizType.toUpperCase()} QUIZ</BigTitle>
      <SubTitle>
        Choose a topic{" "}
        <span role="img" aria-label="finger pointing down">
          👇
        </span>
      </SubTitle>
      <SubjectsContainer>
        {availableSubjects
          .sort((a, b) => {
            if (a! < b!) {
              return -1;
            }
            if (a! > b!) {
              return 1;
            }
            return 0;
          })
          .map(subject => (
            <SubjectElement
              key={subject}
              value={subject as Subject}
              title={shortenLengthySubjects(subject as string)!}
            />
          ))}
        <SubjectElement value="" title="Random" />
      </SubjectsContainer>
    </>
  );
};
