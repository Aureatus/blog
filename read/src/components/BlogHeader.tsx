import { Link } from "react-router-dom";
import UserStateInterface from "../interfaces/UserStateInterface";
import Logout from "./auth/LogoutButton";

const BlogHeader = ({ user, setUser }: UserStateInterface) => (
  <header className="level p-5">
    <section className="level-left">
      <div className="level-item">
        <h1 className="title is-1">Blog Reading</h1>
      </div>
    </section>
    <section className="level-right">
      <div className="level-item">
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
      </div>
    </section>
  </header>
);

export default BlogHeader;
