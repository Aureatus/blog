import { Link } from "react-router-dom";
import UserStateInterface from "../interfaces/UserStateInterface";
import Logout from "./auth/LogoutButton";

const BlogHeader = ({ user, setUser }: UserStateInterface) => (
  <header>
    <h1>Blog project</h1>
    {user ? (
      <Logout setUser={setUser} />
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    )}
  </header>
);

export default BlogHeader;
