import UserStateInterface from "../../interfaces/UserStateInterface";

const Logout = ({ setUser }: UserStateInterface) => (
  <button
    type="button"
    onClick={() => {
      setUser(null);
    }}
  >
    Logout
  </button>
);

export default Logout;
