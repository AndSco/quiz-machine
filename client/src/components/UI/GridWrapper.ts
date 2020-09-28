import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

export const GridWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 0 3rem;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  justify-content: center;
  align-content: flex-start;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.smallScreens}) {
    width: 90vw;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0 1rem;
    align-items: center;
  }
`;
