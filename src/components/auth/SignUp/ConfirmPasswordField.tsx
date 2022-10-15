import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const ConfirmPasswordField = ({
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
}: {
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  confirmPasswordError: SignUpErrorInterface | null;
}) => (
  <div className="field">
    <label htmlFor="confirmPassword" className="label">
      Confirm Password
      <div className="control">
        <input
          className={`input${confirmPasswordError ? " is-danger" : ""}`}
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
);

export default ConfirmPasswordField;
