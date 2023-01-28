import { Dispatch, SetStateAction, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import login from "../../../helpers/auth/login";
import PasswordField from "./PasswordField";
import UserNameField from "./UserNameField";

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
            <UserNameField
              userName={userName}
              setUserName={setUserName}
              userNameError={userNameError}
            />
            <PasswordField
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
            />
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
