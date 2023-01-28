import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import postLogin from "../../lib/fetch/auth/postLogin";

const login = async (
  userName: string,
  password: string,
  setUser: Dispatch<SetStateAction<string | null>>,
  setUserNameError: Dispatch<SetStateAction<Error | null>>,
  setPasswordError: Dispatch<SetStateAction<Error | null>>,
  navigate: NavigateFunction
) => {
  try {
    const loginResponse = await postLogin(userName, password);
    if (loginResponse instanceof Error) throw loginResponse;
    const bearerToken = await loginResponse.token;
    if (typeof setUser === "function") setUser(bearerToken);
    setUserNameError(null);
    setPasswordError(null);
    navigate("/posts");
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "User not found") {
        setUserNameError(err);
        setPasswordError(null);
      }
      if (err.message === "Wrong Password") {
        setPasswordError(err);
        setUserNameError(null);
      }
    }
  }
};

export default login;
