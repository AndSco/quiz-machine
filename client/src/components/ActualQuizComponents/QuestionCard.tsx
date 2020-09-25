import React, { useState } from "react";
import { Question as PublicQuizQuestion } from "../../models/PublicQuizQuestion";
import { PrivateQuizQuestion } from "../../models/PrivateQuiz";
import { Reply } from "./Reply";
import { Icon } from "../UI/Icon";
import {
  CardBottom,
  CardBottomItem,
  NextButton,
  QuestionNumber,
  RepliesContainer,
  StyledCard,
  StyledQuestion,
  CodeContainer
} from "./StyledComponents";

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
      {(question as PrivateQuizQuestion).code && (
        <CodeContainer>
          {/* <code style={{ whiteSpace: "pre-wrap" }}>
            {(question as PrivateQuizQuestion).code as string}
          </code> */}
          <code
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{
              __html: (question as PrivateQuizQuestion).code as string
            }}
          />
        </CodeContainer>
      )}
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