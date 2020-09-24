import styled from "styled-components";
import { Colors } from "../../../../../constants/colors";
import { SubmitButton } from "../../../../UI/Form";

export const AddCodeButton = styled.p`
  border-bottom: 2px solid ${Colors.DARK_BLUE};
  color: ${Colors.DARK_BLUE};
  font-size: 0.8rem;
  margin-top: 0;
  margin-bottom: 50px;
  padding: 0.5rem;
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
  background-color: whitesmoke;
  padding: 0 1rem;
  border-radius: 40px;
  font-size: 0.8rem;
  text-align: left;
  margin: 0.6rem 0;
`;

export const UploadedQuestionPreview = styled.h3`
  font-size: 0.9rem;
  color: ${Colors.BLACK};
`;
