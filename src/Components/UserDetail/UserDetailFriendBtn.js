import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./UserDetail.css";

const UserDetailFriendBtn = () => {
  const {
    axios_request,
    jwtData,
    myFriendsValue,
    didMyFriendsMountValue,
  } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [myFriends, setMyFriends] = myFriendsValue;
  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;
  const [pp, setpp] = useState(false);

  const [friendBtn, setFriendBtn] = useState(false);

  const location = useLocation();

  const local_history = JSON.parse(localStorage.getItem("local_history"));
  let userid = local_history.userid;
  let fname = local_history.fname;
  let lname = local_history.lname;
  let username = local_history.username;

  //we will fetch the logged in users friends list incase if the myfriends was not loaded
  const get_myfriends = () => {
    const route = `/friend/${jwtData.sub}`;
    const method = "GET";
    const cb_err = (err) => {};

    const cb_response = (response) => {
      setMyFriends(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_err,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (didMyFriendsMount) {
      get_myfriends();
      setDidMyFriendsMount(false);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    const check = myFriends.findIndex((x) => {
      return x.username === username;
    });
    if (check !== -1) {
      setFriendBtn(true);
    } else {
      setFriendBtn(false);
    }
    setpp(!pp);
  }, [myFriends]);

  const clickHandler = () => {
    const route = `/friend/${userid}`;
    const method = "POST";

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    if (friendBtn == true) {
      const get_index = myFriends.findIndex((x) => x.username == username);

      if (get_index !== -1) {
        myFriends.splice(get_index, 1);
        setMyFriends(myFriends);
      }
    } else {
      myFriends.push({
        _id: userid,
        username: username,
        fname: fname,
        lname: lname,
      });
    }

    setpp(!pp);
  };

  return (
    <div className="UserDetailFriendBtn">
      {error && <div className="error">{error}</div>}
      {!error && (
        <div
          style={{ color: friendBtn ? "red" : "blue" }}
          className={
            friendBtn ? "add-btn fas fa-user-minus" : "add-btn fas fa-user-plus"
          }
          onClick={(e) => {
            e.preventDefault();
            setFriendBtn(!friendBtn);

            setpp(!pp);
            clickHandler();
          }}
        ></div>
      )}
    </div>
  );
};

export default UserDetailFriendBtn;
