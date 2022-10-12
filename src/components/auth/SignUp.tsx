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

  const [errors, setErrors] = useState<SignUpErrorInterface[] | null>(null);

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
        setErrors(errorObject);
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
                    className="input"
                    type="text"
                    id="givenName"
                    value={givenName}
                    placeholder="Joe"
                    onChange={(e) => setGivenName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="control is-expanded">
                <label htmlFor="familyName" className="label">
                  Last name
                  <input
                    className="input"
                    type="text"
                    id="familyName"
                    value={familyName}
                    placeholder="Bloggs"
                    onChange={(e) => setFamilyName(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <label htmlFor="userName" className="label">
                Username
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    id="userName"
                    value={userName}
                    placeholder="example@gmail.com"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="*********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>
            <div className="field">
              <input
                className="button is-link is-fullwidth"
                type="submit"
                value="Signup"
              />
            </div>
          </form>
          {errors &&
            errors.map((error) => (
              <div key={error.param}>
                <h3>{error.param}</h3>
                <p>{error.msg}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default SignUp;
