import React, { useContext, useEffect } from "react";
import { Form } from "./AuthForm";
import { RegistrationFormInputsValues } from "../../constants/formInputsValues";
import { SectionTitle } from "./Styled";
import { Colors } from "../../constants/colors";
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
        <p style={{ color: Colors.LIGHTER_GREY, marginBottom: "2rem" }}>
          Register to create & share custom quizzes
        </p>
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
