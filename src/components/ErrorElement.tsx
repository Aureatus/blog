const ErrorElement = ({ message }: { message: string }) => (
  <div className="hero is-danger">
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-size-1 has-text-centered is-capitalized ">
          {message}
        </h1>
      </div>
    </div>
  </div>
);

export default ErrorElement;
