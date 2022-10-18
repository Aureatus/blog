import { Link } from "react-router-dom";

const SuccessElement = () => (
  <div className="hero is-fullheight is-success">
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-size-1 has-text-centered is-capitalized ">
          Blog updated!
        </h1>
        <div className="buttons is-centered">
          <Link to="/blogs" className="button is-link">
            Back to blogs
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SuccessElement;
