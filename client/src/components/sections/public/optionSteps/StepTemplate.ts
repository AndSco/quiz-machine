import styled from "styled-components";
import { slideUp } from "../../../../constants/animations";
import { breakpoints } from "../../../../constants/breakpoints";

export const StepTemplate = styled.div`
  animation: ${slideUp} 0.5s ease;

  @media (min-width: ${breakpoints.hugeScreens}) {
    margin-top: 7rem;
  }
`;
