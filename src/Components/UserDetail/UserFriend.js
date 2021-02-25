import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./UserFriend.css";
import UserFriendCard from "./UserFriendCard";

const UserFriend = ({ path }) => {
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const [friendBtn, setFriendBtn] = useState([]);

  const [isChanged, setIsChanged] = useState(false);
  const { myFriendsValue, didMyFriendsMountValue, axios_request } = useContext(
    OdinBookContext
  );

  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;

  const [myFriends, setMyFriends] = myFriendsValue;
  const location = useLocation();
  let userid;
  let username;
  let fname;
  let lname;
  //since there will be no location.state for myfriends route.
  if (path !== "myfriends") {
    const local_history = JSON.parse(localStorage.getItem("local_history"));
    userid = local_history.userid;
    fname = local_history.fname;
    lname = local_history.lname;
  }

  const make_server_request = () => {
    let friend_list_route;
    if (path == "myfriends") {
      friend_list_route = `/friend/${jwtData.sub}`;
    } else {
      friend_list_route = `/friend/${userid}`;
    }
    const friend_list_method = "GET";

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
      setGetLoading(false);
    };

    const cb_response = (response) => {
      if (path == "myfriends") {
        setMyFriends(response.data);
      } else {
        if (userid == jwtData.sub) {
          setMyFriends(response.data);
        } else {
          const h = Array(response.data.length).fill(false);
          setFriendBtn(h);
        }
      }
      setResult(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: friend_list_route,
      data: "",
      method: friend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };
  const { jwtData } = useContext(OdinBookContext);

  useEffect(() => {
    if (path == "myfriends") {
      if (didMyFriendsMount) {
        make_server_request();
        setDidMyFriendsMount(false);
      } else {
        setResult(myFriends);
        setGetLoading(false);
      }
    } else {
      if (jwtData.sub !== userid) {
        make_server_request();
      } else {
        if (didMyFriendsMount) {
          make_server_request();
          setDidMyFriendsMount(false);
        } else {
          setResult(myFriends);
          setGetLoading(false);
        }
      }
    }
  }, [location.pathname]);

  return (
    <div
      className={path === "myfriends" ? "UserFriend" : "UserFriend myaccount"}
    >
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
            (result.length === 0 ? (
              <div className="empty-friends">
                {path !== "myfriends" && jwtData.sub !== userid && (
                  <div>
                    <span>{fname} </span> <span>{lname} </span>
                    <span>has no friends on OdinBook :(</span>
                  </div>
                )}
                {(path === "myfriends" || jwtData.sub === userid) && (
                  <div>
                    <div>You don't have any friends to show.</div>
                    <div>You can add them by searching their name :)</div>
                    <div>
                      To search with username, please prefix with '@' :)
                    </div>
                  </div>
                )}
              </div>
            ) : (
              result.map((value, index) => {
                return (
                  <UserFriendCard
                    value={value}
                    index={index}
                    setError={setError}
                    key={uniqid()}
                    friendBtn={friendBtn}
                    setFriendBtn={setFriendBtn}
                    userid={userid}
                    isChanged={isChanged}
                    setIsChanged={setIsChanged}
                    path={path}
                  />
                );
              })
            ))}
        </>
      )}
    </div>
  );
};

export default UserFriend;
