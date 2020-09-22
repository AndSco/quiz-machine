import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { MediumButton } from "./Buttons";

export const FormContainer = styled.div`
  width: 600px;
  padding: 2rem 0;
  padding-bottom: 3.5rem;
  background-color: ${Colors.YELLOW};
  color: ${Colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const FormTitle = styled.h4`
  color: ${Colors.ORANGE};
  text-transform: uppercase;
  margin-top: 0;
`;

export const SubmitButton = styled(MediumButton)`
  position: absolute;
  left: ${300 - 125}px;
  bottom: -25px;
`;
