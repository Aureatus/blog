import UserStateInterface from "../../interfaces/UserStateInterface";

const Logout = ({ setUser }: UserStateInterface) => (
  <button
    type="button"
    onClick={() => {
      if (setUser) setUser(null);
    }}
  >
    Logout
  </button>
);

export default Logout;
