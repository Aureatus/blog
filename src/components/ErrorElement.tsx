import { Link, useRouteError } from "react-router-dom";

const ErrorElement = ({ providedError }: { providedError: Error | null }) => {
  if (providedError)
    return (
      <div className="hero is-fullheight is-danger">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 has-text-centered is-capitalized ">
              {providedError.message}
            </h1>
            {providedError.message === "Please login or sign up" ? (
              <div className="buttons is-centered">
                <Link to="/login" className="button is-link">
                  Login
                </Link>
                <Link to="/signup" className="button is-link">
                  Signup
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  const error = useRouteError();
  if (!(error instanceof Error)) return null;
  return (
    <div className="hero is-fullheight is-danger">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-size-1 has-text-centered is-capitalized ">
            {error.message}
          </h1>
          {error.message === "Please login or sign up" ? (
            <div className="buttons is-centered">
              <Link to="/login" className="button is-link">
                Login
              </Link>
              <Link to="/signup" className="button is-link">
                Signup
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
