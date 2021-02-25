import React, { useContext, useRef, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./Signup.css";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [signupClick, setSignupClick] = useState(false);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const ref_fname = useRef();
  const ref_lname = useRef();
  const ref_username = useRef();
  const ref_password = useRef();

  const axios_signup = () => {
    setPostLoading(true);
    const signup_route = "/signup";
    const signup_method = "POST";
    const cb_error = (err) => {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
      setPostLoading(false);
    };

    const cb_response = (response) => {
      setPostLoading(false);
      setErrors([]);
      setError("");
    };

    axios_request({
      route: signup_route,
      data: {
        fname: ref_fname.current.value,
        lname: ref_lname.current.value,
        username: ref_username.current.value,
        password: ref_password.current.value,
      },
      method: signup_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const display_errors = () => {
    let arr = [];

    if (!Array.isArray(errors)) {
      arr.push(<li key={uniqid()}>{errors.msg}</li>);
    } else {
      for (let i = 0; i < errors.length; i++) {
        arr.push(<li key={uniqid()}>{errors[i].msg}</li>);
      }
    }

    return <ul className="errors">{arr}</ul>;
  };

  return (
    <div className="Signup">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="head">Signup</div>
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter your First Name"
              ref={ref_fname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Enter your Last Name"
              ref={ref_lname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              ref={ref_username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
              ref={ref_password}
            />
          </div>
          {display_errors()}
          <div className="buttons">
            <div className="signup-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!postLoading) {
                    return axios_signup();
                  } else {
                    return;
                  }
                }}
              >
                {postLoading ? "signing-in" : "Sign-up"}
              </button>
            </div>
            <div
              className="login-btn"
              onClick={(e) => {
                e.preventDefault();
                setSignupClick(true);
              }}
            >
              <button>Login</button>
            </div>
          </div>

          {signupClick && <Redirect to="/login" />}
        </form>
      )}
    </div>
  );
};

export default Signup;
