import React from "react";
import {
  useRouteMatch,
  Link,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ to, label }) => {
  let match = useRouteMatch({ path: to });

  if (match != null) {
    match = match.isExact ? true : false;
  } else {
    match = false;
  }

  const location = useLocation();

  const arr = location.pathname.split("/");

  const element = document.querySelector("#search");

  if (element) {
    if (arr[1] !== "search") {
      element.value = "";
    }
  }
  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={to}>
        <i className={label}></i>
      </Link>
    </div>
  );
};

export default Navigation;
