import { Link } from "react-router-dom";
import UserStateInterface from "../interfaces/UserStateInterface";
import Logout from "./auth/LogoutButton";

const BlogHeader = ({ user, setUser }: UserStateInterface) => (
  <header>
    <h1>Blog project</h1>
    {user ? (
      <Logout setUser={setUser} />
    ) : (
      <div className="buttons">
        <Link to="/login" className="button is-link">
          Login
        </Link>
        <Link to="/signup" className="button is-link">
          Signup
        </Link>
      </div>
    )}
  </header>
);

export default BlogHeader;
