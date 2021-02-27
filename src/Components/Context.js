import axios from "axios";
import { set } from "mongoose";
import React, { createContext, useEffect, useState } from "react";
import uniqid from "uniqid";

import socketIOClient from "socket.io-client";
import Login from "./Login/Login";
import UserFriend from "./UserDetail/UserFriend";

const ENDPOINT = "https://odinbook12.herokuapp.com";

// require("dotenv").config();
// console.log("mamamamam");

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  // const [serverUrl] = useState("http://localhost:3000/odinbook");

  //to render the searchresult page if the user hits enter
  const [searchValueChange, setSearchValueChange] = useState(false);

  //to prefill the search bar if there is a value in the url
  const [searchBarState, setSearchBarState] = useState({ search: "" });

  //for MyFriends to not re-render
  const [myFriends, setMyFriends] = useState([]);
  const [didMyFriendsMount, setDidMyFriendsMount] = useState(true);

  //for myabout to not re-render
  const [myAbout, setMyAbout] = useState({});
  const [didMyAboutMount, setdidMyAboutMount] = useState(true);

  //for mypost to not re-render
  const [myPosts, setMyposts] = useState([]);
  const [didMyPostsMount, setDidMyPostsMount] = useState(true);

  //for mynewsfeed to not re-render
  const [myNewsfeed, setMyNewsFeed] = useState([]);
  const [didMyNewsFeedMount, setDidMyNewsFeedMount] = useState(true);

  //for chatlist
  const [myChatList, setMyChatList] = useState([]);
  const [isRead, setIsRead] = useState([]);
  const [didMyChatListMount, setDidMyChatListMount] = useState(true);

  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);

  const [errors, setErrors] = useState("");

  // let jwt = JSON.parse(localStorage.getItem("jwtData"));
  const [jwtData, setJwtData] = useState(
    JSON.parse(localStorage.getItem("jwtData"))
  );

  let serverUrl = "https://odinbook12.herokuapp.com/odinbook";

  const axios_request = async ({
    route,
    data,
    method,
    axios_error,
    axios_response,
  }) => {
    if (jwtData !== null || route === "/login" || route === "/signup") {
      try {
        let token;
        let headers;
        if (route !== "/login" && route !== "/signup") {
          token = jwtData.token;
          headers = { authorization: `Bearer ${token}` };
        }

        const response_data = await axios({
          url: `${serverUrl}${route}`,
          method: method,
          headers: headers || "",
          data: data,
        });

        if (route === "/login" || route === "/signup") {
          localStorage.setItem(
            "jwtData",
            JSON.stringify(response_data.data.jwtData)
          );
          setJwtData(response_data.data.jwtData);
        }
        setIsAuth(true);
        console.log("Utils Response=", response_data);
        axios_response(response_data);
      } catch (err) {
        if (err.response) {
          console.log("Utils Error", err.response.data);
          if (err.response.status === 403) {
            setIsAuth(false);
          }
        } else {
          console.log("Utils Error", err.message);
        }
        axios_error(err);
      }
    } else {
      console.log("Utils Error= NO JWT TOKEN");
      setIsAuth(false);
    }
  };

  const [socket, setSocket] = useState("");

  const isLogin = async () => {
    const route = "/isUserAuth";
    const method = "GET";

    let headers;
    try {
      const token = jwtData.token;
      headers = { authorization: `Bearer ${token}` };

      const response = await axios({
        url: `${serverUrl}${route}`,
        method: method,
        data: token,
        headers: headers,
      });

      console.log("response from context login", response);
      setIsAuth(true);
      setLoading(false);
    } catch (err) {
      console.log("error from context login", err);
      setLoading(false);
      if (err.response) {
        if (err.response.status === 403) {
          setIsAuth(false);
        } else {
          setErrors(err.response.data);
        }
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      const socket12 = socketIOClient(ENDPOINT, {
        withCredentials: true,
      });
      setSocket(socket12);
      if (jwtData) {
        socket12.emit("join", jwtData.user);
      }
    }
    if (!isAuth) {
      isLogin();
    } else {
      setLoading(false);
    }
  }, [isAuth]);

  const display_errors = () => {
    let arr = [];

    if (!Array.isArray(errors)) {
      arr.push(<li key={uniqid()}>{errors.msg}</li>);
    } else {
      for (let i = 0; i < errors.length; i++) {
        arr.push(<li key={uniqid()}>{errors[i].msg}</li>);
      }
    }

    return <ul className="errors">{arr}</ul>;
  };

  return (
    <OdinBookContext.Provider
      value={{
        searchValue: [searchValueChange, setSearchValueChange],
        searchBarStateValue: [searchBarState, setSearchBarState],
        jwtData: jwtData,

        myFriendsValue: [myFriends, setMyFriends],
        didMyFriendsMountValue: [didMyFriendsMount, setDidMyFriendsMount],

        myAboutValue: [myAbout, setMyAbout],

        myPostsValue: [myPosts, setMyposts],
        didMyPostsMountValue: [didMyPostsMount, setDidMyPostsMount],

        myNewsFeedValue: [myNewsfeed, setMyNewsFeed],
        didMyNewsFeedMountValue: [didMyNewsFeedMount, setDidMyNewsFeedMount],

        didMyAboutMountValue: [didMyAboutMount, setdidMyAboutMount],

        isAuthValue: [isAuth, setIsAuth],

        socket: socket,

        axios_request: axios_request,

        myChatListValue: [myChatList, setMyChatList],
        isReadValue: [isRead, setIsRead],
        didMyChatListMountValue: [didMyChatListMount, setDidMyChatListMount],
      }}
    >
      {!errors && (
        <>
          {!loading ? (
            children
          ) : (
            <div className="loading-container">
              <div className="spinner-border loading" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
        </>
      )}
      {errors && display_errors()}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
