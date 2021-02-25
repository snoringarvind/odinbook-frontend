import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import MyPostList from "../MyPosts/MyPostList";
import MyPostCreate from "../MyPosts/MyPostCreate";
// import MyPostDetail from "../MyPosts/MyPostDetail";
import MyPostDelete from "../MyPosts/MyPostDelete";
import NewsFeed from "../NewsFeed/NewsFeed";
import PostDetail from "../NewsFeed/PostDetail";
import Navigation from "../Navigation/Navigation";
import Login from "../Login/Login";
import Logout from "../Logout";
import Signup from "../Signup/Signup";
import "./Home.css";
import SearchBar from "../Search/SearchBar";
import SearchResult from "../Search/SearchResult";
import UserDetail from "../UserDetail/UserDetail";
import Hamburger from "../Hamburger/Hamburger";
import MyFriends from "../MyFriends/MyFriends";
// import { OdinBookContext } from "../Context";
import UserPost from "../UserDetail/UserPost";
import UserFriend from "../UserDetail/UserFriend";
import { OdinBookContext } from "../Context";
import Chat from "../Chat/Chat";
import ChatList from "../ChatList/ChatList";
import WelcomeMsg from "../WelcomeMsg/WelcomeMsg";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  const [isClick, setIsclick] = useState(false);

  const { isAuthValue, jwtData } = useContext(OdinBookContext);
  const [isAuth, setIsAuth] = isAuthValue;
  // console.log(isAuth);

  const history = useHistory();
  // console.log(history);

  // console.log(location.pathname);

  console.log(location);
  const path = location.pathname;

  const ref_isClick = useRef();

  if (ref_isClick.current) {
    console.log(ref_isClick.current);
  }

  console.log(path);
  useEffect(() => {
    const x = window;
    x.addEventListener("click", (e) => {
      //maybe if something goes wrong ..putting this in a try,catch block
      try {
        e.stopPropagation();
        e.preventDefault();
        let arr = e.target.classList;

        for (let i = 0; i < arr.length; i++) {
          let element = document.querySelector(`.${arr[i]}`);

          // doing this 'if(element==null)' so if the form-btn is clicked cancel this function shouldn't be affected.
          //since the form-btn will be null when it is closed, so to prevent the error
          if (element == null) {
            return;
          }

          let p = element.classList;
          if (
            p[i].toString() !== "drop-btn" &&
            p[i] !== null &&
            p[i] !== "ham-icon" &&
            p[i] !== "close-icon"
          ) {
            setIsclick(false);
          }
          arr = [];
        }

        arr = [];
      } catch (err) {
        console.log(err.message);
      }
    });
  }, []);

  console.log(path);
  return (
    <div className="Home">
      {!isAuth && <div className="odin-book">OdinBook</div>}
      {!isAuth &&
        (path === "/signup" ? (
          <Redirect to="/signup" />
        ) : (
          <Redirect to="/login" />
        ))}

      {/* {isAuth && (path === "/login" || path === "/signup") && <WelcomeMsg />} */}

      {/* {!isAuth && path === "/login"} */}
      {isAuth && (path === "/login" || path === "/signup") && (
        <Redirect to={{ pathname: "/", state: { from: path } }} />
      )}

      {isAuth && (
        <>
          <div className="Navigation">
            {/* <div className="nav-bar-title">Odinbook</div> */}
            {/* width 68% */}
            <SearchBar />
            <div className="left-nav">
              <Navigation to="/" label="fas fa-home" />
              <Navigation to="/friends" label="fas fa-user-friends" />

              {/* mychat will show the list of conversations */}
              {/*for now keeping chat list aside */}
              <Navigation to="/mychat" label="fab fa-facebook-messenger" />

              {/* width 32% */}
              <div
                style={{
                  color: isClick ? "red" : "",
                }}
                className="drop-btn "
                onClick={(e) => {
                  e.stopPropagation();
                  setIsclick(!isClick);
                }}
                ref={ref_isClick}
              >
                {isClick ? (
                  <div className="close-icon fas fa-times-circle"></div>
                ) : (
                  <div className="ham-icon fa fa-caret-down"></div>
                )}
              </div>
            </div>
          </div>
          {isClick ? <Hamburger /> : ""}
        </>
      )}

      <Switch location={background || location}>
        {isAuth && (
          <>
            <Route exact path="/">
              <UserPost path="newsfeed" />
            </Route>
            <Route exect path="/user/:username">
              <UserDetail />
            </Route>
            <Route path="/search/:name">
              <SearchResult />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/friends">
              <UserFriend path="myfriends" />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/mychat">
              <ChatList />
            </Route>
          </>
        )}

        {!isAuth && (
          <>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}

        {/* <Route path="/user/:username/:">
          <UserDetail />
        </Route> */}
        {/* <Route path="/myposts">
          <MyPostList />
        </Route> */}
        {/* <Route path="/update-post/:mypostid">
          <MyPostUpdate />
        </Route> */}
        {/* <Route exact path="/mypost/:mypostid">
          <MyPostDetail />
        </Route> */}
        {/* <Route path="/create-post">
          <MyPostCreate />
        </Route> */}
        {/* <Route path="/news-feed/:postid">
          <PostDetail />
        </Route> */}

        {/* <Route exact path="/account">
          my-Account
        </Route> */}

        {/* &&&&&& */}
      </Switch>

      {/* <Route path="/delete-post/mypost:id">
        <MyPostDelete />
      </Route> */}
    </div>
  );
};

export default Home;
