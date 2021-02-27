import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";

const SearchResultCard = ({
  value,
  index,
  result,
  friendBtn,
  setFriendBtn,
  arrg,
}) => {
  const { jwtData, myFriendsValue, axios_request } = useContext(
    OdinBookContext
  );
  const [myFriends, setMyFriends] = myFriendsValue;

  const [myFriendsIndex, setMyFriendsIndex] = useState(null);
  const [error, setError] = useState("");

  //removes friend
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

    if (friendBtn[index] === false) {
      const get_index = myFriends.findIndex(
        (x) => x.username === value.username
      );
      if (get_index !== -1) {
        myFriends.splice(get_index, 1);
        setMyFriends(myFriends);
      }
    } else {
      myFriends.push(value);
    }
  };

  const [pp, setpp] = useState(false);

  useEffect(() => {
    const check = myFriends.findIndex((x) => x.username === value.username);

    if (check !== -1) {
      friendBtn[index] = true;
      setFriendBtn(friendBtn);
    }
    setpp(!pp);
  }, []);

  const element = document.querySelector("#search");

  return (
    <div className="SearchResultCard">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="profile-picture">
            {[...value.fname[0].toLowerCase()]}
          </div>
          <div
            className="name-container"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              element.value = "";
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
              <div className="name">
                <span>{value.fname} </span>
                <span>{value.lname}</span>
              </div>
            </Link>
            <div className="username">{value.username}</div>
          </div>
          {value._id !== jwtData.sub && (
            <div
              className={
                friendBtn[index]
                  ? "add-btn fas fa-user-minus"
                  : "add-btn fas fa-user-plus"
              }
              style={{ color: friendBtn[index] ? "red" : "blue" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                friendBtn[index] = !friendBtn[index];
                setFriendBtn(friendBtn);
                setpp(!pp);
                clickHandler();
              }}
            ></div>
          )}

          {value._id !== jwtData.sub && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultCard;
