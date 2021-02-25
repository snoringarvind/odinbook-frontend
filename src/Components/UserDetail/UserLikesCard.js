import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import "./UserLikes.css";

const UserLikesCard = ({
  value,
  index,
  friendBtn,
  setFriendBtn,
  myFriends,
  setMyFriends,
}) => {
  const [pp, setpp] = useState(false);
  const { axios_request, jwtData } = useContext(OdinBookContext);
  const [error, setError] = useState("");

  const clickHandler = () => {
    const route = `/friend/${value._id}`;
    const method = "POST";

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
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

    console.log(friendBtn[index]);
    if (friendBtn[index] == false) {
      const get_index = myFriends.findIndex(
        (x) => x.username == value.username
      );
      if (get_index !== -1) {
        console.log(get_index);
        myFriends.splice(get_index, 1);
        setMyFriends(myFriends);
      }
    } else {
      myFriends.push(value);
    }
    console.log(myFriends);
  };

  console.log(value.username);
  useEffect(() => {
    const check = myFriends.findIndex((x) => x.username === value.username);
    console.log(check);
    if (check !== -1) {
      friendBtn[index] = true;
      setFriendBtn(friendBtn);
    }
    setpp(!pp);
  }, []);

  return (
    <div className="UserLikesCard">
      {error && <div className="error">{error}</div>}

      {!error && (
        <>
          {" "}
          <div className="profile-picture">
            {[...value.fname[0].toLowerCase()]}
          </div>
          <div className="name">
            <span>{value.fname}</span>
            <span>{value.lname}</span>
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
