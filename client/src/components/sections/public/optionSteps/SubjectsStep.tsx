import React, { useContext } from "react";
import styled from "styled-components";
import { BigTitle, Title, SubTitle } from "../../../UI/Titles";
import { QuizType, Subject } from "../../../../models/PublicQuizQuestion";
import {
  shortenLengthySubjects,
  getSubjectBackgroundPic
} from "../../../../utils/functions";
import {
  ProgrammingCategories,
  TriviaCategories
} from "../../../../constants/questionCategories";
import { Colors } from "../../../../constants/colors";
import { QuizzesContext } from "../../../../contexts/quizzes/Quizzes";
import { GridWrapper } from "../../../UI/GridWrapper";
import { GridCard } from "../../../UI/GridCard";

const SubjectElement: React.FC<{ title: string; value: Subject }> = ({
  title,
  value
}) => {
  const { configQuiz, goToNextQuizConfiguration } = useContext(QuizzesContext);
  return (
    <GridCard
      onClick={() => {
        configQuiz("subject", value);
        goToNextQuizConfiguration();
      }}
      style={{ backgroundImage: `url("${getSubjectBackgroundPic(value)})"` }}
    >
      <Title>{title}</Title>
    </GridCard>
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
      <GridWrapper>
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
      </GridWrapper>
    </>
  );
};
