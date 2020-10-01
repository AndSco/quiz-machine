import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { MediumButton } from "./Buttons";
import { breakpoints } from "../../constants/breakpoints";

export const FormContainer = styled.div`
  width: 600px;
  padding: 2rem 1.5rem;
  padding-bottom: 3.5rem;
  background-color: ${(props: { isRegistration?: boolean }) =>
    props.isRegistration ? Colors.LIGHTEST_GREY : Colors.YELLOW};
  color: ${Colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: ${breakpoints.smallScreens}) {
    width: 100vw;
  }
`;

export const FormTitle = styled.h4`
  color: ${Colors.DARK_BLUE};
  text-transform: uppercase;
  margin-top: 0;
`;

export const SubmitButton = styled(MediumButton)`
  position: absolute;
  left: calc(50% - 125px);
  bottom: -25px;
`;
