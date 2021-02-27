import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";

const ExploreCard = ({ value, index }) => {
  const { jwtData, myFriendsValue, axios_request } = useContext(
    OdinBookContext
  );
  const [friendBtn, setFriendBtn] = useState(false);
  const [error, setError] = useState("");
  const [myFriends, setMyFriends] = myFriendsValue;

  const clickHandler = () => {
    const route = `/friend/${value._id}`;
    const method = "POST";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {
      // console.log(response);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    if (friendBtn == false) {
      const get_index = myFriends.findIndex(
        (x) => x.username == value.username
      );
      if (get_index !== -1) {
        myFriends.splice(get_index, 1);
        setMyFriends(myFriends);
      }
    } else {
      myFriends.push(value);
    }
  };
  return (
    <div className="ExploreCard">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="profile-picture">
            {[...value.fname[0].toLowerCase()]}
          </div>
          <div className="name-container">
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
              <div className="name">
                <span>{value.fname} </span>
                <span>{value.lname}</span>
              </div>
            </Link>
            <div className="username">{value.username}</div>
          </div>
          {jwtData.sub !== value._id && (
            <div
              className="add-btn"
              style={{
                color: friendBtn ? "red" : "blue",
              }}
              onClick={() => {
                setFriendBtn(!friendBtn);
                clickHandler();
              }}
            >
              <div
                // style={{ color: "blue" }}
                className={
                  friendBtn[index]
                    ? "add-btn fas fa-user-minus"
                    : "add-btn fas fa-user-plus"
                }
              ></div>
            </div>
          )}
          <div className="chat-link-container">
            <Link
              to={{
                pathname: "/chat",
                state: {
                  userid: value._id,
                  fname: value.fname,
                  lname: value.lname,
                  username: value.username,
                },
              }}
            >
              <div className="chat-btn fab fa-facebook-messenger"></div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreCard;
