import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUp from "../../../helpers/auth/signUp";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";
import ConfirmPasswordField from "./ConfirmPasswordField";
import LegalNameField from "./LegalNameField";
import PasswordField from "./PasswordField";
import UserNameInput from "./UserNameField";

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
            <LegalNameField
              givenName={givenName}
              setGivenName={setGivenName}
              givenNameError={givenNameError}
              familyName={familyName}
              setFamilyName={setFamilyName}
              familyNameError={familyNameError}
            />
            <UserNameInput
              userName={userName}
              setUserName={setUserName}
              userNameError={userNameError}
            />
            <PasswordField
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
            />
            <ConfirmPasswordField
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              confirmPasswordError={confirmPasswordError}
            />
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
