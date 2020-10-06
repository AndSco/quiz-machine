import styled from "styled-components";
import { Colors } from "../../../../../constants/colors";
import { SubmitButton } from "../../../../UI/Form";

export const AddCodeButton = styled.p`
  border-radius: 40px;
  color: ${Colors.TERMINAL_GREEN};
  background-color: ${Colors.BLACK};
  font-size: 0.8rem;
  margin: 0 auto;
  max-width: 80%;
  margin-bottom: 50px;
  padding: 0.5rem 0.8rem;
`;

export const ComplexInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
`;

export const StyledUploadedReplies = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
  min-width: 60%;
`;

export const PinkSubmitButton = styled(SubmitButton)`
  background-color: ${Colors.STEEL_PINK};
`;

export const StyledAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 0 1rem;
  border-radius: 40px;
  font-size: 0.8rem;
  text-align: left;
  margin: 0.6rem 0;
  color: ${Colors.BLACK};
`;

export const UploadedQuestionPreview = styled.h3`
  font-size: 1rem;
  border-bottom: 2px solid ${Colors.DIRT_WHITE};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  margin-top: 0;
  font-style: italic;
  color: ${Colors.BLACK};
`;
