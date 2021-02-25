import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const UserFriendCard = ({
  value,
  index,
  friendBtn,
  setFriendBtn,
  userid,
  isChanged,
  setIsChanged,
  path,
}) => {
  const [error, setError] = useState("");

  const { jwtData, myFriendsValue, axios_request } = useContext(
    OdinBookContext
  );

  const [myFriends, setMyFriends] = myFriendsValue;

  //removes friend
  const clickHandler = () => {
    // if i don't do this it show 'cannot update state after the component is unmounted'
    //becoz you are not waiting for the response and directly deleting the user from the sreen
    // if (personid.toString() !== userid.toString()) {
    //   setBtnLoading(true);
    //   setIsClicked(!isClicked);
    // }

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

    // only do this for the owner,,, bcoz it deletes the user from the screen
    if (jwtData.sub == userid || path == "myfriends") {
      myFriends.splice(index, 1);
      setMyFriends(myFriends);
      setIsChanged(!isChanged);
    }

    if (jwtData.sub !== userid) {
      if (friendBtn[index] == false) {
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

  return (
    <div className="UserFriendCard">
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
                color:
                  path == "myfriends"
                    ? "red"
                    : jwtData.sub === userid
                    ? "red"
                    : friendBtn[index]
                    ? "red"
                    : "blue",
              }}
              onClick={() => {
                friendBtn[index] = !friendBtn[index];
                setFriendBtn(friendBtn);
                setpp(!pp);

                clickHandler();
              }}
            >
              {(jwtData.sub == userid || path === "myfriends") && (
                <div className="add-btn fas fa-user-minus"></div>
              )}
              {jwtData.sub !== userid && path !== "myfriends" && (
                <div
                  // style={{ color: "blue" }}
                  className={
                    friendBtn[index]
                      ? "add-btn fas fa-user-minus"
                      : "add-btn fas fa-user-plus"
                  }
                ></div>
              )}
            </div>
          )}
          {/* value._id woh idividual friend ka id hain and userid jiska profile visit kar rahe hain uska id hain */}
          {jwtData.sub !== value._id && (
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

export default UserFriendCard;
