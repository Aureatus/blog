import UserStateInterface from "../../interfaces/UserStateInterface";

const Logout = ({ setUser }: UserStateInterface) => (
  <button
    className="button is-danger"
    type="button"
    onClick={() => {
      if (setUser) setUser(null);
    }}
  >
    <span className="icon">
      <i className="fa-solid fa-arrow-right-from-bracket" />
    </span>
    <span>Logout</span>
  </button>
);

export default Logout;
