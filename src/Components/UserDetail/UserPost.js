import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MypostCreate from "../MyPosts/MyPostCreate";

import "./UserPost.css";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import UserPostCard from "./UserPostCard";
import MyPostDelete from "../MyPosts/MyPostDelete";
import WelcomeMsg from "../WelcomeMsg/WelcomeMsg";
import UserFriend from "./UserFriend";

const UserPost = ({ path }) => {
  const {
    jwtData,
    axios_request,
    myPostsValue,
    didMyPostsMountValue,
    myNewsFeedValue,
    didMyNewsFeedMountValue,
    myFriendsValue,
    didMyFriendsMountValue,
  } = useContext(OdinBookContext);
  const [myPosts, setMyPosts] = myPostsValue;
  const [myNewsfeed, setMyNewsFeed] = myNewsFeedValue;
  const [didMyNewsFeedMount, setDidMyNewsFeedMount] = didMyNewsFeedMountValue;
  const [didMyPostsMount, setDidMyPostsMount] = didMyPostsMountValue;
  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  const [isWelcomeMsgClick, setIsWelcomeMsgClick] = useState(false);
  //herer result is the post list
  const [result, setResult] = useState([]);

  const [isOwner, setIsOwner] = useState(false);
  const [updateClick, setUpdateClick] = useState("");
  const [createClick, setCreateClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [likeLength, setLikeLength] = useState([]);

  const location = useLocation();
  //this is so we don't have to make request to the server to prefill the update form.
  const [updateData, setUpdateData] = useState("");

  const [postid, setPostid] = useState("");

  const [updateIndex, setUpdateIndex] = useState("");

  const [indexOfCardClicked, setindexOfCardClicked] = useState(null);

  const [myFriends, setMyFriends] = myFriendsValue;

  const [comments, setComments] = useState([]);

  //putting in an if-block since in news feed location.state will be undefined
  let userid;
  let fname;
  let lname;
  let from;
  if (path == "userpost") {
    const local_history = JSON.parse(localStorage.getItem("local_history"));
    userid = local_history.userid;
    fname = local_history.fname;
    lname = local_history.lname;
    from = local_history.from;
  }

  // console.log(getLoading);
  const get_posts = () => {
    let post_list_route;
    if (path == "userpost") {
      post_list_route = `/posts/${userid}`;
    } else if (path === "newsfeed") {
      post_list_route = "/news-feed";
    }

    const post_list_method = "GET";
    const cb_error = (err) => {
      setError(err.message);

      setGetLoading(false);
    };
    const cb_response = (response) => {
      if (path == "newsfeed") {
        setMyNewsFeed(response.data);
      } else {
        if (userid === jwtData.sub) {
          setMyPosts(response.data);
        }
      }

      setResult(response.data);
      setGetLoading(false);

      const h = Array(response.data.length).fill(false);
      setLikeClick(h);
    };

    axios_request({
      route: post_list_route,
      data: "",
      method: post_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (path == "userpost") {
      //herer if the url is news-feed , the userid will be undefined.
      if (userid !== jwtData.sub) {
        get_posts();
        setIsOwner(false);
      } else {
        if (didMyPostsMount) {
          get_posts();
          setIsOwner(true);
          setDidMyPostsMount(false);
        } else {
          setResult(myPosts);
          setGetLoading(false);
          setIsOwner(true);
        }
      }
    } else if (path == "newsfeed") {
      if (didMyNewsFeedMount) {
        get_posts();
        setIsOwner(false);
        setDidMyNewsFeedMount(false);
      } else {
        setResult(myNewsfeed);
        setGetLoading(false);
        setIsOwner(false);
      }
    }
  }, [location.pathname, from]);

  useEffect(() => {
    if (path === "newsfeed") {
      get_posts();
      setIsOwner(false);
    }
  }, [myFriends.length]);

  //this is to shows the friends in user likes;
  const get_myfriends = () => {
    const friend_list_route = `/friend/${jwtData.sub}`;
    const friend_list_method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setMyFriends(response.data);
    };

    axios_request({
      route: friend_list_route,
      data: "",
      method: friend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };
  useEffect(() => {
    if (didMyFriendsMount) {
      // console.log(didMyFriendsMount);
      get_myfriends();
      setDidMyFriendsMount(false);
    } else {
      // console.log(didMyFriendsMount);
      return;
    }
  }, []);

  const post_create_response = (response) => {
    setResult([response.data].concat(result));
    setMyPosts([response.data].concat(myPosts));
  };

  const post_update_response = (response) => {
    result[updateIndex] = response.data;
    setResult(result);
    myPosts[updateIndex] = response.data;
    setMyPosts(myPosts);
  };

  //using updateindex for update and delete same
  const post_delete_repsonse = (response) => {
    //as soon as we get the response delete the post from the screen

    result.splice(updateIndex, 1);
    setResult(result);

    myPosts.splice(updateIndex, 1);
    setMyPosts(myPosts);

    //we are doing this here bcoz jab tak child component mein value change nahi hota parent component re-render nahi hoga.
    //MyPostDelete meinn setDelteClick mein same component mein hi deleteClick value change karna pad raha tha isliye UserPost re-render nahi ho raha tha.
    //but postupdate and postcreate ka click-value child compoenent postform mein change ho raha tha isliye userpost re-render ho raha tha.
    setDeleteClick(false);
  };

  useEffect(() => {
    if (from === "/login" || from === "/signup") {
      const elemnt_welcome_msg = document.querySelector("#welcome_msg_unique");
      if (elemnt_welcome_msg) {
        elemnt_welcome_msg.addEventListener("click", (e) => {
          setIsWelcomeMsgClick(true);
        });
      }
    }
  }, []);

  const [likeClick, setLikeClick] = useState([]);
  const [UserLikedIndex, setUsersLikedIndex] = useState(null);
  return (
    <div className={path == "userpost" ? "UserPost myaccount" : "UserPost"}>
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          {/* doing path=='newsfeed' herer bcoz for a second it shows loading even if we are loading the data from state */}
          {/* maybe we will show loading even for newsfeed for a second. */}
          {/* {getLoading && path !== "newsfeed" && "loading"} */}
          {!isWelcomeMsgClick &&
            (from === "/login" || from === "/signup") &&
            path === "newsfeed" && <WelcomeMsg />}
          {getLoading && (
            <div className="loading-container" style={{ zIndex: "1" }}>
              <div className="spinner-border loading" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {!getLoading && (
            <>
              {isOwner && (
                <div>
                  <MypostCreate
                    user_post_response={post_create_response}
                    createClick={createClick}
                    setCreateClick={setCreateClick}
                  />
                </div>
              )}
              {updateClick && (
                <div>
                  <MyPostUpdate
                    postid={postid}
                    updateClick={updateClick}
                    setUpdateClick={setUpdateClick}
                    updateData={updateData}
                    user_post_response={post_update_response}
                  />
                </div>
              )}
              {deleteClick && (
                <MyPostDelete
                  setDeleteClick={setDeleteClick}
                  deleteClick={deleteClick}
                  user_delete_response={post_delete_repsonse}
                  postid={postid}
                />
              )}
              {result.length == 0 ? (
                <div className="empty-posts">
                  {path == "newsfeed" &&
                    "Please add friends to see their posts here :)"}
                  {isOwner &&
                    path !== "newsfeed" &&
                    "Create new posts to see them here"}
                  {!isOwner && path !== "newsfeed" && (
                    <>
                      <span>
                        {fname} {lname} doesn't have any posts to show :(
                      </span>
                    </>
                  )}
                </div>
              ) : (
                result.map((value, index) => {
                  return (
                    <UserPostCard
                      key={uniqid()}
                      value={value}
                      index={index}
                      setPostid={setPostid}
                      setUpdateClick={setUpdateClick}
                      setUpdateData={setUpdateData}
                      setUpdateIndex={setUpdateIndex}
                      indexOfCardClicked={indexOfCardClicked}
                      setindexOfCardClicked={setindexOfCardClicked}
                      isOwner={isOwner}
                      setDeleteClick={setDeleteClick}
                      deleteClick={deleteClick}
                      likeClick={likeClick}
                      setLikeClick={setLikeClick}
                      postsLength={result.length}
                      path={path}
                      likeLength={likeLength}
                      setLikeLength={setLikeLength}
                      UserLikedIndex={UserLikedIndex}
                      setUsersLikedIndex={setUsersLikedIndex}
                      result={result}
                      setResult={setResult}
                      setGetLoading={setGetLoading}
                      comments={comments}
                      setComments={setComments}
                    />
                  );
                })
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserPost;
