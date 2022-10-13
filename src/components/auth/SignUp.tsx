import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SignUpErrorInterface from "../../interfaces/SignUpErrorInterface";
import postSignUp from "../../lib/fetch/auth/postSignUp";

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

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        const errorObject = JSON.parse(err.message).errors;

        setGivenNameError(
          errorObject.find(
            (error: { param: string }) => error.param === "given_name"
          ) || null
        );
        setFamilyNameError(
          errorObject.find(
            (error: { param: string }) => error.param === "family_name"
          ) || null
        );
        setUserNameError(
          errorObject.find(
            (error: { param: string }) => error.param === "user_name"
          ) || null
        );
        setPasswordError(
          errorObject.find(
            (error: { param: string }) => error.param === "password"
          ) || null
        );
        setConfirmPasswordError(
          errorObject.find(
            (error: { param: string }) => error.param === "confirm_password"
          ) || null
        );
      }
    }
  };

  return (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Sign up</h1>
          <form onSubmit={(e) => signUp(e)}>
            <div className="field is-grouped">
              <div className="control is-expanded">
                <label htmlFor="givenName" className="label">
                  First name
                  <input
                    className={`input${givenNameError ? " is-danger" : ""}`}
                    type="text"
                    id="givenName"
                    value={givenName}
                    placeholder="Joe"
                    onChange={(e) => setGivenName(e.target.value)}
                    required
                  />
                </label>
                {givenNameError?.msg ? (
                  <p className="help is-danger">{givenNameError.msg}</p>
                ) : null}
              </div>
              <div className="control is-expanded">
                <label htmlFor="familyName" className="label">
                  Last name
                  <input
                    className={`input${familyNameError ? " is-danger" : ""}`}
                    type="text"
                    id="familyName"
                    value={familyName}
                    placeholder="Bloggs"
                    onChange={(e) => setFamilyName(e.target.value)}
                    required
                  />
                </label>
                {familyNameError?.msg ? (
                  <p className="help is-danger">{familyNameError.msg}</p>
                ) : null}
              </div>
            </div>
            <div className="field">
              <label htmlFor="userName" className="label">
                Username
                <div className="control">
                  <input
                    className={`input${userNameError ? " is-danger" : ""}`}
                    type="email"
                    id="userName"
                    value={userName}
                    placeholder="example@gmail.com"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </label>
              {userNameError?.msg ? (
                <p className="help is-danger">{userNameError.msg}</p>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
                <div className="control">
                  <input
                    className={`input${passwordError ? " is-danger" : ""}`}
                    type="password"
                    id="password"
                    value={password}
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>
              {passwordError?.msg ? (
                <p className="help is-danger">{passwordError.msg}</p>
              ) : null}
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
                <div className="control">
                  <input
                    className={`input${
                      confirmPasswordError ? " is-danger" : ""
                    }`}
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="*********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </label>
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
