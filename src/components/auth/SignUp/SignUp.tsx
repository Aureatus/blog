import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUp from "../../../helpers/auth/signUp";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

import ConfirmPasswordInput from "./ConfirmPasswordInput";
import FamilyNameInput from "./FamilyNameInput";
import GivenNameInput from "./GivenNameInput";
import PasswordInput from "./PasswordInput";
import UserNameInput from "./UserNameInput";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [givenNameError, setGivenNameError] =
    useState<SignUpErrorInterface | null>(null);
  const [familyNameError, setFamilyNameError] =
    useState<SignUpErrorInterface | null>(null);
  const [userNameError, setUserNameError] =
    useState<SignUpErrorInterface | null>(null);
  const [passwordError, setPasswordError] =
    useState<SignUpErrorInterface | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<SignUpErrorInterface | null>(null);

  const navigate = useNavigate();

  return (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Sign up</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp(
                userName,
                givenName,
                familyName,
                password,
                confirmPassword,
                setGivenNameError,
                setFamilyNameError,
                setUserNameError,
                setPasswordError,
                setConfirmPasswordError,
                navigate
              );
            }}
          >
            <div className="field is-grouped">
              <div className="control is-expanded">
                <GivenNameInput
                  givenName={givenName}
                  setGivenName={setGivenName}
                  givenNameError={givenNameError}
                />
              </div>
              {givenNameError?.msg ? (
                <p className="help is-danger">{givenNameError.msg}</p>
              ) : null}
              <div className="control is-expanded">
                <FamilyNameInput
                  familyName={familyName}
                  setFamilyName={setFamilyName}
                  familyNameError={familyNameError}
                />
              </div>
              {familyNameError?.msg ? (
                <p className="help is-danger">{familyNameError.msg}</p>
              ) : null}
            </div>
            <div className="field">
              <UserNameInput
                userName={userName}
                setUserName={setUserName}
                userNameError={userNameError}
              />{" "}
              {userNameError?.msg ? (
                <p className="help is-danger">{userNameError.msg}</p>
              ) : null}
            </div>
            <div className="field">
              <PasswordInput
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
              />
              {passwordError?.msg ? (
                <p className="help is-danger">{passwordError.msg}</p>
              ) : null}
            </div>
            <div className="field">
              <ConfirmPasswordInput
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                confirmPasswordError={confirmPasswordError}
              />
              {confirmPasswordError?.msg ? (
                <p className="help is-danger">{confirmPasswordError.msg}</p>
              ) : null}
            </div>
            <div className="field">
              <input
                className="button is-link is-fullwidth"
                type="submit"
                value="Signup"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
