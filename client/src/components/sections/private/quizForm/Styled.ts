import styled from "styled-components";
import { Colors } from "../../../../constants/colors";
import { SubmitButton } from "../../../UI/Form";

export const RadioButtonsContainer = styled.div`
  display: flex;
  margin: 0.8rem 0 1.6rem 0;
`;

export const RadioContainer = styled.div`
  display: flex;
  margin: 0 1rem;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? Colors.DARK_BLUE : "white"};
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "white" : Colors.DARK_BLUE};
  padding: 0.4rem 0.9rem 0.4rem 0.6rem;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;

  label {
    padding-left: 6px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  input {
    margin: 0;
    display: none;
  }
`;

export const FormButton = styled(SubmitButton)`
  background-color: ${Colors.STEEL_PINK};
`;

export const StyledBackgroundImagePreview = styled.img`
  width: 300px;
  height: 100px;
  margin: 0.7rem 0 1.5rem 0;
  border-radius: 10px;
  border: 3px solid white;
  background-color: ${Colors.DARK_BLUE};
`;
