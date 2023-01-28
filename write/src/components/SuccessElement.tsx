import { Link } from "react-router-dom";

const SuccessElement = ({ message }: { message: string }) => (
  <div className="hero is-fullheight is-success">
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-size-1 has-text-centered is-capitalized ">
          {message}
        </h1>
        <div className="buttons is-centered">
          <Link to="/posts" className="button is-link">
            Back to posts
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SuccessElement;
