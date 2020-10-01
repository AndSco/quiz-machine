import styled from "styled-components";

interface Props {
  marginVertical?: string;
}

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props: Props) =>
    props.marginVertical ? props.marginVertical : 0};
  margin-bottom: ${(props: Props) =>
    props.marginVertical ? props.marginVertical : 0};
`;
