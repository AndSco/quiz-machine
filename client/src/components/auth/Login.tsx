import React, { useContext, useEffect } from "react";
import { Form } from "./AuthForm";
import { LoginFormInputsValues } from "../../constants/formInputsValues";
import { SectionTitle, Paragraph } from "./Styled";
import { AccessSwitch } from "./AccessSwitch";
import { AuthContext } from "../../contexts/auth/Auth";

export const Login: React.FC = () => {
  const { goToPrivateSection } = useContext(AuthContext);

  useEffect(() => {
    goToPrivateSection();
  }, [goToPrivateSection]);

  return (
    <>
      <SectionTitle>Nice to see you back!</SectionTitle>
      <Paragraph>Enter your credentials to access</Paragraph>
      <Form scope="login" title="Log in" inputs={LoginFormInputsValues} />
      <AccessSwitch scope="login" />
    </>
  );
};
