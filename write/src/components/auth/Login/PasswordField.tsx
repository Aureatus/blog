import { Dispatch, SetStateAction } from "react";

const PasswordField = ({
  password,
  setPassword,
  passwordError,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordError: Error | null;
}) => (
  <div className="field">
    <label htmlFor="password" className="label">
      Password
      <div className="control">
        <input
          className={`input${passwordError?.message ? " is-danger" : ""}`}
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
);

export default PasswordField;
