import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { MediumButton } from "./Buttons";
import { breakpoints } from "../../constants/breakpoints";

interface Props {
  background?: string;
  color?: string;
}

export const FormContainer = styled.div`
  width: 600px;
  padding: 2rem 1.5rem;
  padding-bottom: 3.5rem;
  background-color: ${(props: Props) =>
    props.background ? props.background : Colors.YELLOW};
  color: ${(props: Props) => (props.color ? props.color : Colors.BLACK)};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* color: ${Colors.DARK_BLUE}; */

  @media (max-width: ${breakpoints.smallScreens}) {
    width: 100vw;
  }
`;

export const FormTitle = styled.h4`
  text-transform: uppercase;
  margin-top: 0;
`;

export const SubmitButton = styled(MediumButton)`
  position: absolute;
  left: calc(50% - 125px);
  bottom: -25px;
`;
