import React from "react";

export type InputName = "username" | "password" | "confirm password";

export interface AuthAction {
  type: InputName;
  payload?: string;
}

// LOGIN
export interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginReducer: React.Reducer<LoginFormInputs, AuthAction> = (
  state: LoginFormInputs,
  action: AuthAction
): LoginFormInputs => {
  const newState = {
    ...state,
    [action.type]: action.payload
  };
  return newState;
};

const LoginStartingValues: LoginFormInputs = {
  username: "",
  password: ""
};

// REGISTRATION
export interface RegistrationFormInputs {
  username: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterReducer: React.Reducer<RegistrationFormInputs, AuthAction> = (
  state: RegistrationFormInputs,
  action: AuthAction
): RegistrationFormInputs => {
  const newState = {
    ...state,
    [action.type]: action.payload
  };
  return newState;
};

const RegisterStartingValues: RegistrationFormInputs = {
  username: "",
  password: "",
  passwordConfirmation: ""
};

// ALL REDUCERS EXPORT
export const AuthReducers = {
  login: {
    reducer: LoginReducer,
    startingValues: LoginStartingValues
  },
  register: {
    reducer: RegisterReducer,
    startingValues: RegisterStartingValues
  }
};
