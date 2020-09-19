import styled from "styled-components";

export const QuizBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(props: { imageUrl: string }) =>
    `url("${props.imageUrl}")`};
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
