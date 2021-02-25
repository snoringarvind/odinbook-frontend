import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Login from "../Login/Login";
import Logout from "../Logout";
import Signup from "../Signup/Signup";
import "./Home.css";
import SearchBar from "../Search/SearchBar";
import SearchResult from "../Search/SearchResult";
import UserDetail from "../UserDetail/UserDetail";
import Hamburger from "../Hamburger/Hamburger";
import UserPost from "../UserDetail/UserPost";
import UserFriend from "../UserDetail/UserFriend";
import { OdinBookContext } from "../Context";
import Chat from "../Chat/Chat";
import ChatList from "../ChatList/ChatList";
import Menu from "./Menu";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  // const [isClick, setIsclick] = useState(false);

  // let isClick = false;

  const isClick = useRef(false);

  useEffect(() => {
    console.log(isClick.current);
  }, []);

  const { isAuthValue, jwtData } = useContext(OdinBookContext);
  const [isAuth, setIsAuth] = isAuthValue;

  const path = location.pathname;

  const params = useParams();

  //doing this if /search/:name;
  const search_url_params = location.pathname.split("/")[1];

  //doing this if-block, incase if the user refreshes the page the state will vanish so we will store the previous state values in localstorage
  if (
    location.pathname !== "/" &&
    location.pathname !== "/friends" &&
    location.pathname !== "/mychat" &&
    search_url_params !== "search"
  ) {
    if (location.state) {
      localStorage.setItem(
        "local_history",
        JSON.stringify({
          userid: location.state.userid,
          fname: location.state.fname,
          lname: location.state.lname,
          username: location.state.username,
          from: path,
        })
      );
    }
  }

  console.log(JSON.parse(localStorage.getItem("local_history")));
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
            // setIsclick(false);
            isClick.current = false;
          }
          arr = [];
        }

        arr = [];
      } catch (err) {
        console.log(err.message);
      }
    });
  }, []);

  return (
    <div className="Home">
      {!isAuth && <div className="odin-book">OdinBook</div>}
      {!isAuth &&
        (path === "/signup" ? (
          <Redirect to="/signup" />
        ) : (
          <Redirect to="/login" />
        ))}

      {isAuth && (path === "/login" || path === "/signup") && (
        <Redirect to="/" />
      )}

      {isAuth && (
        <>
          <div className="Navigation">
            {/* width 68% */}
            <SearchBar />
            <div className="left-nav">
              <Navigation to="/" label="fas fa-home" />
              <Navigation to="/friends" label="fas fa-user-friends" />

              {/* mychat will show the list of conversations */}
              {/*for now keeping chat list aside */}
              <Navigation to="/mychat" label="fab fa-facebook-messenger" />
            </div>
            <Menu />
          </div>
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
      </Switch>

      {/* <Route path="/delete-post/mypost:id">
        <MyPostDelete />
      </Route> */}
    </div>
  );
};

export default Home;
