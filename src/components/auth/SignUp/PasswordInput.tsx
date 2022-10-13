import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const PasswordInput = ({
  password,
  setPassword,
  passwordError,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordError: SignUpErrorInterface | null;
}) => (
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
);

export default PasswordInput;
