import React from "react";
import styled from "styled-components";
import { AuthScope } from "../../models/AuthScope";
import { Colors } from "../../constants/colors";
import { Link } from "react-router-dom";

type Props = { scope: AuthScope };

const Container = styled.div`
  color: ${Colors.LIGHTER_GREY};
  margin-top: 2.5rem;
`;

const LinkTag = styled.h4`
  margin-top: 0;
  color: ${Colors.LAVENDER};

  :hover {
    color: ${Colors.ORANGE};
  }
`;

export const AccessSwitch: React.FC<Props> = ({ scope }) => {
  return (
    <Container>
      <p style={{ marginBottom: ".3rem" }}>
        {scope === "login" ? "Not a member yet?" : "Already registered?"}
      </p>
      <Link to={scope === "login" ? "/register" : "/login"}>
        <LinkTag>{scope === "login" ? "REGISTER" : "LOGIN"}</LinkTag>
      </Link>
    </Container>
  );
};
