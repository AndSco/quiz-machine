import React from "react";

export type InputName = "login" | "password";

export interface Action {
  type: InputName;
  payload?: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface RegistrationFormInputs {
  username: string;
  password: string;
}

const LoginReducer: React.Reducer<LoginFormInputs, Action> = (
  state: LoginFormInputs,
  action: Action
): LoginFormInputs => {
  const newState = {
    ...state,
    [action.type]: action.payload
  };
  return newState;
};

const LoginStartingValues = {
  username: "",
  password: ""
};

const RegisterReducer: React.Reducer<RegistrationFormInputs, Action> = (
  state: RegistrationFormInputs,
  action: Action
): RegistrationFormInputs => {
  const newState = {
    ...state,
    [action.type]: action.payload
  };
  return newState;
};

const RegisterStartingValues = {
  username: "",
  password: ""
};

export const FormReducers = {
  login: {
    reducer: LoginReducer,
    startingValues: LoginStartingValues
  },
  register: {
    reducer: RegisterReducer,
    startingValues: RegisterStartingValues
  }
};
