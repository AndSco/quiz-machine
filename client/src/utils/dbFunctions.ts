import axios from "axios";
import {
  LoginFormInputs,
  RegistrationFormInputs
} from "../reducers/FormReducers";
import { apiEndPoints } from "../constants/apiEndpoints";

export const loginUser = async (inputValues: LoginFormInputs) => {
  try {
    const { username, password } = inputValues;
    const response = await axios.post(apiEndPoints.LOGIN, {
      username,
      password
    });
    console.log("RES", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (inputValues: RegistrationFormInputs) => {
  try {
    const { username, password } = inputValues;
    const response = await axios.post(apiEndPoints.REGISTER, {
      username,
      password
    });
    console.log("RES", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
