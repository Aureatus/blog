import { Dispatch, SetStateAction, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import login from "../../helpers/auth/login";

const Login = () => {
  const setUser = useLoaderData() as Dispatch<SetStateAction<string | null>>;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState<Error | null>(null);
  const [passwordError, setPasswordError] = useState<Error | null>(null);

  const navigate = useNavigate();

  return (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (setUser)
                login(
                  userName,
                  password,
                  setUser,
                  setUserNameError,
                  setPasswordError,
                  navigate
                );
            }}
          >
            <div className="field">
              <label htmlFor="userName" className="label">
                Username
                <div className="control">
                  <input
                    className={`input${
                      userNameError?.message ? " is-danger" : ""
                    }`}
                    type="email"
                    id="userName"
                    value={userName}
                    placeholder="example@gmail.com"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </label>
              {userNameError?.message ? (
                <p className="help is-danger">{userNameError.message}</p>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
                <div className="control">
                  <input
                    className={`input${
                      passwordError?.message ? " is-danger" : ""
                    }`}
                    type="password"
                    id="password"
                    value={password}
                    placeholder="*********"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>
              {passwordError?.message ? (
                <p className="help is-danger">{passwordError.message}</p>
              ) : null}
            </div>
            <div className="field">
              <input
                className="button is-link is-fullwidth"
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
