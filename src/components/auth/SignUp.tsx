import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../../lib/fetch/auth/postSignUp";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      console.log(await err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => signUp(e)}>
        <label htmlFor="givenName">
          First name
          <input
            type="text"
            id="givenName"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="familyName">
          Last name
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="userName">
          Username
          <input
            type="email"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default SignUp;
