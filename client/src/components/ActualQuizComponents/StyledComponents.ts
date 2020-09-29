import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { BaseButton } from "../UI/Buttons";

export const StyledCard = styled.div`
  width: 600px;
  max-width: 80vw;
  padding: 2rem;
  background-color: white;
  background-color: rgba(255, 255, 255, 0.95);
  align-items: flex-start;
  position: relative;
  border-radius: 20px;
  border: 3px solid;
`;

export const NextButton = styled(BaseButton)`
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

export const RepliesContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 2rem;
`;

export const CardBottomItem = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.LIGHTER_GREY};
  font-size: 0.8rem;
`;

export const QuestionNumber = styled.h4`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cccccc;
  color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const StyledQuestion = styled.h4`
  font-size: 1.4rem;
  line-height: 30px;
`;

export const CodeContainer = styled.div`
  padding: 1.3rem 1rem;
  background-color: black;
  color: ${Colors.TERMINAL_GREEN};
  font-size: 14px;
  text-align: left;
`;
