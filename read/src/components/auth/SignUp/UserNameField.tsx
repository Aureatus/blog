import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const UserNameField = ({
  userName,
  setUserName,
  userNameError,
}: {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userNameError: SignUpErrorInterface | null;
}) => (
  <div className="field">
    <label htmlFor="userName" className="label">
      Username
      <div className="control">
        <input
          className={`input${userNameError ? " is-danger" : ""}`}
          type="email"
          id="userName"
          value={userName}
          placeholder="example@gmail.com"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
    </label>
    {userNameError?.msg ? (
      <p className="help is-danger">{userNameError.msg}</p>
    ) : null}
  </div>
);

export default UserNameField;
