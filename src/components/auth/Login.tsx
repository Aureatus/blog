import { useState, FormEvent } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import postLogin from "../../lib/fetch/auth/postLogin";

const Login = () => {
  const setUser = useLoaderData();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState<Error | null>(null);
  const [passwordError, setPasswordError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await postLogin(userName, password);
      if (loginResponse instanceof Error) throw loginResponse;
      const bearerToken = await loginResponse.token;
      if (typeof setUser === "function") setUser(bearerToken);
      setUserNameError(null);
      setPasswordError(null);
      navigate("/blogs");
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

  return (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Login</h1>
          <form onSubmit={(e) => login(e)}>
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
