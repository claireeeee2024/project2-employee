import { Link } from "react-router-dom";

const ErrorScreen = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold" style={{ fontSize: "100px" }}>
        404
      </h1>
      <p className="h3">Page Not Found</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorScreen;
