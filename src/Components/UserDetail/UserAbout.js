import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import UseraAboutCard from "./UserAboutCard";
import uniqid from "uniqid";
import "./UserAbout.css";

const UserAbout = () => {
  const {
    myAboutValue,
    didMyAboutMountValue,
    axios_request,
    jwtData,
  } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;
  const [didMyAboutMount, setdidMyAboutMount] = didMyAboutMountValue;

  const [result, setResult] = useState();

  const [getLoading, setGetLoading] = useState(true);

  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const fname = location.state.fname;
  const lname = location.state.lname;
  const username = location.state.username;
  const userid = location.state.userid;

  const profile_route = `/profile/${userid}`;
  const profile_route_method = "GET";

  const [clickIndex, setClickIndex] = useState(null);

  const make_server_request = () => {
    const cb_response = (response) => {
      if (userid === jwtData.sub) {
        setMyAbout(response.data);
      }
      console.log(response.data);
      setResult(response.data);

      setGetLoading(false);
    };
    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
      setGetLoading(false);
    };

    axios_request({
      route: profile_route,
      data: "",
      method: profile_route_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    console.log(jwtData.sub, userid);
    if (jwtData.sub !== userid) {
      make_server_request();
    } else {
      if (didMyAboutMount) {
        make_server_request();
        setdidMyAboutMount(false);
      } else {
        setResult(myAbout);
        setGetLoading(false);
      }
    }
  }, [location.pathname]);

  let g;
  if (result) {
    delete result.user;
    delete result._id;
    delete result.__v;

    g = Object.keys(result);
    console.log(g);
  }

  const [tooltip, setTooltip] = useState(null);
  const [ee, setee] = useState({});

  useEffect(() => {
    if (result) {
      let h = {};
      for (let i = 0; i < g.length; i++) {
        h[g[i]] = result[g[i]];
        if (i === g.length - 1) {
          setee(h);
        }
      }
    }
  }, [result]);

  // const [ee, setee] = useState();
  console.log(ee);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      // console.log(e.key, "jdfjdfjdfnjdfn");
      if (e.key == "Escape") {
        setClickIndex(null);
      }
    });
  }, []);

  return (
    <div className="UserAbout">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          {getLoading && (
            <div className="loading-container">
              <div className="spinner-border loading" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {!getLoading &&
            g.map((value, index) => {
              return (
                <UseraAboutCard
                  key={uniqid()}
                  objkey={value}
                  index={index}
                  clickIndex={clickIndex}
                  setClickIndex={setClickIndex}
                  result={result}
                  setResult={setResult}
                  ee={ee}
                  setee={setee}
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                  userid={userid}
                  jwtData={jwtData}
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default UserAbout;
