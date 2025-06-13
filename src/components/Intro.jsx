import React from "react";

// RRD
import { Form, useFetcher } from "react-router-dom";

// Icons Library
import { FaUserPlus, FaSpinner } from "react-icons/fa";

// assets
import illustration from "../assets/money-removebg.png";

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control Of <span className="accent">Your Money</span>
        </h1>
        <p>Personal budgeting is the secret of financial freedom.</p>
        <fetcher.Form method="post" autoComplete="off">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Creating Account...</span>
                <FaSpinner className="spinner" width={20} />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <FaUserPlus width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person With Money" />
    </div>
  );
};

export default Intro;
