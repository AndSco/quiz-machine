import React from "react";
import { Form } from "../UI/Form";
import { LoginStartingValues } from "../../constants/formInputsValues";
import { SectionTitle } from "./Styled";
import { AccessSwitch } from "./AccessSwitch";

export const Login: React.FC = () => {
  return (
    <>
      <SectionTitle>Nice to see you back!</SectionTitle>
      <Form scope="login" title="Log in" inputs={LoginStartingValues} />
      <AccessSwitch scope="login" />
    </>
  );
};
