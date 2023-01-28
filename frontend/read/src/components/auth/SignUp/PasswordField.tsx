import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const PasswordField = ({
  password,
  setPassword,
  passwordError,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordError: SignUpErrorInterface | null;
}) => (
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
  </div>
);

export default PasswordField;
