import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const FamilyNameInput = ({
  familyName,
  setFamilyName,
  familyNameError,
}: {
  familyName: string;
  setFamilyName: Dispatch<SetStateAction<string>>;
  familyNameError: SignUpErrorInterface | null;
}) => (
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
);

export default FamilyNameInput;
