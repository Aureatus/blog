import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const GivenNameInput = ({
  givenName,
  setGivenName,
  givenNameError,
}: {
  givenName: string;
  setGivenName: Dispatch<SetStateAction<string>>;
  givenNameError: SignUpErrorInterface | null;
}) => (
  <label htmlFor="givenName" className="label">
    First name
    <input
      className={`input${givenNameError ? " is-danger" : ""}`}
      type="text"
      id="givenName"
      value={givenName}
      placeholder="Joe"
      onChange={(e) => setGivenName(e.target.value)}
      required
    />
  </label>
);

export default GivenNameInput;
