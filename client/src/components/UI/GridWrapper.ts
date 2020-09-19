import styled from "styled-components";

export const GridWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 0 3rem;
  flex-wrap: wrap;
  justify-content: space-between;

  ::after {
    content: "";
    flex: auto;
  }
`;
