import {
  RegistrationFormInputs,
  LoginFormInputs
} from "../../reducers/AuthReducers";
import { loginUser, registerUser } from "../../utils/dbFunctions";
import { ApiResponse } from "../../models/ApiResponse";
import { AuthScope } from "../../models/AuthScope";

export interface AuthResponse extends ApiResponse {
  status: "success" | "failure";
}

export const handleSubmit = async (
  scope: AuthScope,
  inputValues: LoginFormInputs | RegistrationFormInputs
) => {
  try {
    let response: AuthResponse;
    if (scope === "login") {
      response = await loginUser(inputValues);
    } else {
      if (
        !passwordsMatch(
          inputValues.password,
          (inputValues as RegistrationFormInputs).passwordConfirmation
        )
      ) {
        response = {
          status: "failure",
          error: "Passwords don't match!",
          message: null,
          payload: null
        };
      } else {
        response = await registerUser(inputValues as RegistrationFormInputs);
      }
    }

    return response;
  } catch (err) {
    return {
      status: "failure",
      error: err.message,
      message: null,
      payload: null
    } as AuthResponse;
  }
};

const passwordsMatch = (password: string, confirmation: string) =>
  password === confirmation;
