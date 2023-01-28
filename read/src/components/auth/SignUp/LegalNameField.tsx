import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const LegalNameField = ({
  givenName,
  setGivenName,
  givenNameError,
  familyName,
  setFamilyName,
  familyNameError,
}: {
  givenName: string;
  setGivenName: Dispatch<SetStateAction<string>>;
  givenNameError: SignUpErrorInterface | null;
  familyName: string;
  setFamilyName: Dispatch<SetStateAction<string>>;
  familyNameError: SignUpErrorInterface | null;
}) => (
  <div className="field is-grouped">
    <div className="control is-expanded">
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
      {givenNameError?.msg ? (
        <p className="help is-danger">{givenNameError.msg}</p>
      ) : null}
    </div>
    <div className="control is-expanded">
      <label htmlFor="familyName" className="label">
        Last name
        <input
          className={`input${familyNameError ? " is-danger" : ""}`}
          type="text"
          id="familyName"
          value={familyName}
          placeholder="Bloggs"
          onChange={(e) => setFamilyName(e.target.value)}
          required
        />
      </label>
    </div>
    {familyNameError?.msg ? (
      <p className="help is-danger">{familyNameError.msg}</p>
    ) : null}
  </div>
);

export default LegalNameField;
