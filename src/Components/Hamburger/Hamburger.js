import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./Hamburger.css";

const Hamburger = () => {
  const { jwtData } = useContext(OdinBookContext);

  return (
    <div className="Hamburger">
      <div className="box-1 box">
        <Link
          to={{
            pathname: `/user/${jwtData.user}/posts`,
            state: {
              fname: jwtData.fname,
              lname: jwtData.lname,
              username: jwtData.user,
              userid: jwtData.sub,
            },
          }}
        >
          <div className="profile-picture">
            {[...jwtData.fname[0].toLowerCase()]}
          </div>
          <div className="nav-link-container">
            <div className="user label">{jwtData.user}</div>

            <div className="nav-link-desc label">See your profile</div>
          </div>
        </Link>
      </div>

      <div className="box-2 box">
        <Link to="/logout">
          <div className="label">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Hamburger;
