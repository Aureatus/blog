import { Dispatch, SetStateAction } from "react";
import SignUpErrorInterface from "../../../interfaces/SignUpErrorInterface";

const UserNameInput = ({
  userName,
  setUserName,
  userNameError,
}: {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userNameError: SignUpErrorInterface | null;
}) => (
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
);

export default UserNameInput;
