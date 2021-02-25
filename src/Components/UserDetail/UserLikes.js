import axios from "axios";
import "./UserLikes.css";
import UserLikesCard from "./UserLikesCard";
import uniqid from "uniqid";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { OdinBookContext } from "../Context";

const UserLikes = ({ postid, setUsersLikedIndex, userid }) => {
  const {
    axios_request,
    jwtData,
    myFriendsValue,
    didMyFriendsMountValue,
  } = useContext(OdinBookContext);

  //!the userid is of the guy who made the post

  const [error, setError] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [myFriends, setMyFriends] = myFriendsValue;
  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;

  const [friendBtn, setFriendBtn] = useState([]);

  const get_users_liked = () => {
    const route = `/post/${postid}/like`;
    const method = "GET";
    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    const cb_response = (response) => {
      setLikeList(response.data.like);

      const h = Array(response.data.like.length).fill(false);
      setFriendBtn(h);
    };

    axios_request({
      route: route,
      method: method,
      data: "",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  //we will fetch the logged in users friends list incase if the myfriends was not loaded
  const get_myfriends = () => {
    const route = `/friend/${jwtData.sub}`;
    const method = "GET";
    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    const cb_response = (response) => {
      setMyFriends(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    get_users_liked();

    if (didMyFriendsMount) {
      get_myfriends();
      setDidMyFriendsMount(false);
    } else {
      return;
    }
  }, []);

  return (
    <div className="UserLikes">
      {error && <div className="error">{error}</div>}

      {!error && (
        <div className="box">
          <div className='form-close-btn fas fa-times-circle"'>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setUsersLikedIndex(null);
              }}
              className="fas fa-times-circle"
            ></button>
          </div>
          {likeList.map((value, index) => {
            return (
              <UserLikesCard
                value={value}
                index={index}
                key={uniqid()}
                friendBtn={friendBtn}
                setFriendBtn={setFriendBtn}
                myFriends={myFriends}
                setMyFriends={setMyFriends}
                userid={userid}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserLikes;
