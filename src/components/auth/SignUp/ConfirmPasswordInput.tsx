import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const ConfirmPasswordInput = ({
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
}: {
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  confirmPasswordError: SignUpErrorInterface | null;
}) => (
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
);

export default ConfirmPasswordInput;
