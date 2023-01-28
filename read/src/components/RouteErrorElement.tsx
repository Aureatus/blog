import { useNavigate, useRouteError } from "react-router-dom";

const RouteErrorElement = () => {
  const navigate = useNavigate();

  const error = useRouteError();
  if (!(error instanceof Error)) return null;
  return (
    <div className="hero is-fullheight is-danger">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-size-1 has-text-centered is-capitalized ">
            {error.message}
          </h1>
          <div className="buttons is-centered">
            <button
              type="button"
              className="button is-link"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorElement;
