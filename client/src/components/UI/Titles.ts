import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { breakpoints } from "../../constants/breakpoints";

export const MainTitle = styled.h3`
  color: ${Colors.BLACK};
  padding-bottom: 0.5rem;
  border-bottom: 5px solid ${Colors.YELLOW};
  margin-bottom: 4rem;
`;

export const BigTitle = styled(MainTitle)`
  margin-bottom: 0.6rem;

  @media (max-width: ${breakpoints.smallScreens}) {
    font-size: 1.9rem;
  }
`;

export const Title = styled.h3`
  background-color: white;
  color: ${Colors.BLACK};
  padding: 0 0.5rem;
  font-size: 1.2rem;
  margin: 0;

  @media (max-width: ${breakpoints.smallScreens}) {
    font-size: 1.6rem;
  }
`;

export const SubTitle = styled.p`
  color: ${Colors.LIGHTER_GREY};
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;
