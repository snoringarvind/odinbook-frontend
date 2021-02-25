import React, { useContext, useRef, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import { Redirect, useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { axios_request, isAuthValue } = useContext(OdinBookContext);
  const [isloginClick, setIsLoginClick] = useState(false);

  const refUsername = useRef();
  const refPassword = useRef();
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const login_route = "/login";
  const login_method = "POST";

  const axios_login = async () => {
    setPostLoading(true);

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
    };

    axios_request({
      route: login_route,
      data: {
        username: refUsername.current.value,
        password: refPassword.current.value,
      },
      method: login_method,
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
    <div className="Login">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="head"> Login</div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              ref={refUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
              ref={refPassword}
            />
          </div>
          {display_errors()}
          <div className="buttons">
            <div className="login-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (postLoading) {
                    return;
                  } else if (
                    refUsername.current.value === "" ||
                    refPassword.current.value === ""
                  ) {
                    return;
                  } else {
                    return axios_login();
                  }
                }}
              >
                {postLoading ? "Logging-in" : "Log-in"}
              </button>
            </div>
            <div
              className="signup-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginClick(true);
              }}
            >
              <button>Sign-up</button>
            </div>
          </div>

          {isloginClick && <Redirect to="/signup" />}
        </form>
      )}
    </div>
  );
};

export default Login;
