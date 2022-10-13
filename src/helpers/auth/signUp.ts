import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import SignUpErrorInterface from "../../interfaces/SignUpErrorInterface";
import postSignUp from "../../lib/fetch/auth/postSignUp";
import findErrorObject from "../../lib/general/findErrorObject";

const signUp = async (
  userName: string,
  givenName: string,
  familyName: string,
  password: string,
  confirmPassword: string,
  setGivenNameError: Dispatch<SetStateAction<SignUpErrorInterface | null>>,
  setFamilyNameError: Dispatch<SetStateAction<SignUpErrorInterface | null>>,
  setUserNameError: Dispatch<SetStateAction<SignUpErrorInterface | null>>,
  setPasswordError: Dispatch<SetStateAction<SignUpErrorInterface | null>>,
  setConfirmPasswordError: Dispatch<
    SetStateAction<SignUpErrorInterface | null>
  >,
  navigate: NavigateFunction
) => {
  try {
    const signUpResponse = await postSignUp(
      userName,
      givenName,
      familyName,
      password,
      confirmPassword
    );
    if (signUpResponse instanceof Error) throw signUpResponse;

    navigate("/login");
  } catch (err) {
    if (err instanceof Error) {
      const errorArray = JSON.parse(err.message).errors;

      setGivenNameError(findErrorObject(errorArray, "given_name"));
      setFamilyNameError(findErrorObject(errorArray, "family_name"));
      setUserNameError(findErrorObject(errorArray, "user_name"));
      setPasswordError(findErrorObject(errorArray, "password"));
      setConfirmPasswordError(findErrorObject(errorArray, "confirm_password"));
    }
  }
};

export default signUp;
