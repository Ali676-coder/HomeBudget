import React from "react";
// RRD Import
import { useRouteError, Link, useNavigate } from "react-router-dom";

// library
import { FaHome, FaArrowAltCircleLeft } from "react-icons/fa";

const Error = () => {
  const error = useRouteError();

  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Uh oh! We've got a problem</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <FaArrowAltCircleLeft />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <FaHome />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
