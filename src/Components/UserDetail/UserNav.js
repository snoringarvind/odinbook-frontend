import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import "./UserNav.css";

const UserNav = ({ to, fname, lname, userid, username, label }) => {
  let match = useRouteMatch({ path: to });
  if (match) {
    match = match.isExact;
    console.log(match);
  }

  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={{ pathname: to, state: { fname, lname, userid, username } }}>
        {label}
      </Link>
    </div>
  );
};

export default UserNav;
