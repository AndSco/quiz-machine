import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { MediumButton } from "./Buttons";

export const FormContainer = styled.div`
  width: 600px;
  padding: 2rem 1.5rem;
  padding-bottom: 3.5rem;
  background-color: ${Colors.YELLOW};
  color: ${Colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const FormTitle = styled.h4`
  color: ${Colors.DARK_BLUE};
  text-transform: uppercase;
  margin-top: 0;
`;

export const SubmitButton = styled(MediumButton)`
  position: absolute;
  left: 200px;
  bottom: -25px;
`;
