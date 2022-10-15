import { Dispatch, SetStateAction } from "react";

const UserNameField = ({
  userName,
  setUserName,
  userNameError,
}: {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userNameError: Error | null;
}) => (
  <div className="field">
    <label htmlFor="userName" className="label">
      Username
      <div className="control">
        <input
          className={`input${userNameError?.message ? " is-danger" : ""}`}
          type="email"
          id="userName"
          value={userName}
          placeholder="example@gmail.com"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
    </label>
    {userNameError?.message ? (
      <p className="help is-danger">{userNameError.message}</p>
    ) : null}
  </div>
);

export default UserNameField;
