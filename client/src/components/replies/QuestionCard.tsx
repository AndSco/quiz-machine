import React, { useState } from "react";
import styled from "styled-components";
import { Question as PublicQuizQuestion } from "../../models/PublicQuizQuestion";
import { PrivateQuizQuestion } from "../../models/PrivateQuiz";
import { BaseButton } from "../UI/Buttons";
import { Colors } from "../../constants/colors";
import { Reply } from "./Reply";
import { Icon } from "../UI/Icon";

export const StyledCard = styled.div`
  width: 600px;
  padding: 2rem;
  background-color: white;
  background-color: rgba(255, 255, 255, 0.95);
  align-items: flex-start;
  position: relative;
  border-radius: 20px;
  border: 3px solid;
`;

const NextButton = styled(BaseButton)`
  background-color: ${Colors.VIOLET};
  background-color: ${(props: { hasReplied: boolean }) =>
    props.hasReplied ? Colors.VIOLET : Colors.LIGHTER_GREY};
  cursor: ${(props: { hasReplied: boolean }) =>
    props.hasReplied ? "pointer" : "auto"};

  :hover {
    background-color: ${(props: { hasReplied: boolean }) =>
      props.hasReplied ? Colors.STEEL_PINK : Colors.LIGHTER_GREY};
  }
`;

const RepliesContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 2rem;
`;

const CardBottomItem = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.LIGHTER_GREY};
  font-size: 0.8rem;
`;

const QuestionNumber = styled.h4`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cccccc;
  color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const StyledQuestion = styled.h4`
  font-size: 1.4rem;
  line-height: 30px;
`;

interface QuestionCardProps {
  question: PublicQuizQuestion | PrivateQuizQuestion;
  numberOfQuestions: number;
  currentNumberOfQuestion: number;
  next: () => void;
  givePoint: () => void;
  quizType: "private" | "public";
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  next,
  numberOfQuestions,
  currentNumberOfQuestion,
  givePoint,
  quizType
}) => {
  console.log("QUESTION", question);

  const [hasReplied, setHasReplied] = useState(false);

  const replyQuestion = () => setHasReplied(true);
  const isRightReply = (reply: string) => reply === question.rightReply;

  const goToNextQuestion = () => {
    setHasReplied(false);
    next();
  };

  return (
    <StyledCard>
      <StyledQuestion dangerouslySetInnerHTML={{ __html: question.question }} />
      <RepliesContainer>
        {question.allReplies
          .filter(reply => reply !== null)
          .map((reply, index) => (
            <Reply
              key={index}
              isRight={isRightReply(reply)}
              hasReplied={hasReplied}
              replyText={reply}
              replyQuestion={replyQuestion}
              givePoint={givePoint}
              replyNumber={index}
            />
          ))}
      </RepliesContainer>
      <NextButton
        hasReplied={hasReplied}
        disabled={!hasReplied}
        onClick={goToNextQuestion}
      >
        NEXT
      </NextButton>
      <CardBottom>
        {quizType === "public" && (
          <>
            <CardBottomItem>
              <Icon icon={"book-open"} />
              {(question as PublicQuizQuestion).subject}
            </CardBottomItem>
            <CardBottomItem>
              <Icon icon={"tachometer-alt"} />
              {(question as PublicQuizQuestion).difficulty.toUpperCase()}
            </CardBottomItem>
          </>
        )}

        <QuestionNumber>{`${currentNumberOfQuestion}/${numberOfQuestions}`}</QuestionNumber>
      </CardBottom>
    </StyledCard>
  );
};
