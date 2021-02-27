import axios from "axios";
import "./UserLikes.css";
import UserLikesCard from "./UserLikesCard";
import uniqid from "uniqid";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { OdinBookContext } from "../Context";

const UserLikes = ({
  postid,
  setUsersLikedIndex,
  userid,
  setGetLoading,
  path,
}) => {
  const { axios_request, jwtData, myFriendsValue } = useContext(
    OdinBookContext
  );

  //!the userid is of the guy who made the post

  const [error, setError] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [myFriends, setMyFriends] = myFriendsValue;
  // const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;

  const [friendBtn, setFriendBtn] = useState([]);

  const [getLikeLoading, setGetLikeLoading] = useState(true);

  const get_users_liked = () => {
    const route = `/post/${postid}/like`;
    const method = "GET";
    const cb_error = (err) => {
      setError(err.message);
      setGetLikeLoading(false);
    };

    const cb_response = (response) => {
      setLikeList(response.data.like);
      setGetLikeLoading(false);

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

  useEffect(() => {
    get_users_liked();
  }, []);

  return (
    <div className="UserLikes">
      {error && <div className="error">{error}</div>}

      {!error && (
        <div className="box">
          {getLikeLoading && (
            <>
              <div className="loading-container">
                <div className="container-2">
                  <div className="loading-msg">Fetching Likes :)</div>
                  <div className="loading">
                    <div className="spinner-border" role="status">
                      <div className="sr-only"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {!getLikeLoading && (
            <>
              <div className='form-close-btn fas fa-times-circle"'>
                <div className="head-msg">People who liked this post.</div>
                <div className="btn-close">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setUsersLikedIndex(null);
                    }}
                    className="fas fa-times-circle"
                  ></button>
                </div>
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
                    setUsersLikedIndex={setUsersLikedIndex}
                    setGetLoading={setGetLoading}
                    getLikeLoading={getLikeLoading}
                    path={path}
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLikes;
