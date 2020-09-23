import React, { useContext, useEffect } from "react";
import { Form } from "./AuthForm";
import { RegistrationFormInputsValues } from "../../constants/formInputsValues";
import { SectionTitle, Paragraph } from "./Styled";
import { AccessSwitch } from "./AccessSwitch";
import { AuthContext } from "../../contexts/auth/Auth";

export const Register: React.FC = () => {
  const { goToPrivateSection } = useContext(AuthContext);

  useEffect(() => {
    goToPrivateSection();
  }, [goToPrivateSection]);

  return (
    <>
      <div>
        <SectionTitle>Join the community!</SectionTitle>
        <Paragraph>Register to create & share custom quizzes</Paragraph>
      </div>
      <Form
        scope="register"
        title="register"
        inputs={RegistrationFormInputsValues}
      />
      <AccessSwitch scope="register" />
    </>
  );
};
