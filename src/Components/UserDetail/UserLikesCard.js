import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import "./UserLikes.css";
import { Link } from "react-router-dom";

const UserLikesCard = ({
  value,
  index,
  friendBtn,
  setFriendBtn,
  myFriends,
  setMyFriends,
  setUsersLikedIndex,
  setGetLoading,
  path,
}) => {
  const [pp, setpp] = useState(false);
  const { axios_request, jwtData } = useContext(OdinBookContext);
  const [error, setError] = useState("");

  const userid = JSON.parse(localStorage.getItem("local_history")).userid;
  // console.log(userid);

  const clickHandler = () => {
    const route = `/friend/${value._id}`;
    const method = "POST";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    // console.log(friendBtn[index]);
    if (friendBtn[index] == false) {
      const get_index = myFriends.findIndex(
        (x) => x.username == value.username
      );
      if (get_index !== -1) {
        myFriends.splice(get_index, 1);
      }
    } else {
      myFriends.push(value);
    }
    setMyFriends(myFriends);
  };

  useEffect(() => {
    const check = myFriends.findIndex((x) => x.username === value.username);

    if (check !== -1) {
      friendBtn[index] = true;
      setFriendBtn(friendBtn);
    }
    setpp(!pp);
  }, []);

  // console.log(value._id, userid);
  return (
    <div className="UserLikesCard">
      {error && <div className="error">{error}</div>}

      {!error && (
        <>
          <div className="profile-picture">
            {[...value.fname[0].toLowerCase()]}
          </div>
          <div className="name">
            {(userid.toString() !== value._id.toString() ||
              path == "newsfeed") && (
              <div
                className="clickable-link"
                onClick={() => {
                  setUsersLikedIndex(null);
                  setGetLoading(true);
                }}
              >
                <Link
                  to={{
                    pathname: `/user/${value.username}/posts`,
                    state: {
                      userid: value._id,
                      fname: value.fname,
                      lname: value.lname,
                      username: value.username,
                    },
                  }}
                >
                  <span>{value.fname} </span>
                  <span>{value.lname}</span>
                </Link>
              </div>
            )}
            {path !== "newsfeed" && userid.toString() === value._id.toString() && (
              <div className="unclickable-link">
                <span>{value.fname} </span>
                <span>{value.lname}</span>
              </div>
            )}
          </div>
          {jwtData.sub !== value._id && (
            <div
              className="add-btn-container"
              onClick={() => {
                friendBtn[index] = !friendBtn[index];
                setFriendBtn(friendBtn);
                setpp(!pp);
                clickHandler();
              }}
              style={{
                color: friendBtn[index] ? "red" : "blue",
              }}
            >
              <div
                className={
                  friendBtn[index]
                    ? "add-btn fas fa-user-minus"
                    : "add-btn fas fa-user-plus"
                }
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserLikesCard;
