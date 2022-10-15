import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  if (!(error instanceof Error)) return null;
  return (
    <div className="hero is-fullheight is-danger">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-size-1 has-text-centered is-capitalized ">
            {error.message}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
