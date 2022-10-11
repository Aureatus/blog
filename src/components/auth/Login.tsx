import { useState, FormEvent } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import postLogin from "../../lib/fetch/auth/postLogin";

const Login = () => {
  const setUser = useLoaderData();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await postLogin(userName, password);
      if (loginResponse instanceof Error) throw loginResponse;
      const bearerToken = await loginResponse.token;
      if (typeof setUser === "function") setUser(bearerToken);
      setError(null);
      navigate("/blogs");
    } catch (err) {
      if (err instanceof Error) setError(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <label htmlFor="userName">
          Username
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Login;
