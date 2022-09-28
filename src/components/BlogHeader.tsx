import { Link } from "react-router-dom";
import Logout from "./auth/LogoutButton";

const BlogHeader = () => {
  const user = localStorage.getItem("bearerToken");

  return (
    <header>
      <h1>Blog project</h1>
      {user ? <Link to="/login">Login</Link> : <Logout />}
    </header>
  );
};

export default BlogHeader;
