import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { FlexColumn } from "../UI/FlexColumn";
import { breakpoints } from "../../constants/breakpoints";

export const SectionTitle = styled.h2`
  color: ${Colors.BLACK};
  margin: 0;
`;

export const Paragraph = styled.p`
  color: ${Colors.LIGHTER_GREY};
  margin-bottom: 2rem;
`;

export const AuthContainer = styled(FlexColumn)`
  @media (min-width: ${breakpoints.hugeScreens}) {
    margin-top: 6rem;
  }
`;
