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
import PageNotFound from "../PageNotFound/PageNotFound";
import Resume from "../Resume/Resume";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  const [isClick, setIsclick] = useState(false);

  const { isAuthValue, jwtData } = useContext(OdinBookContext);
  const [isAuth, setIsAuth] = isAuthValue;

  const path = location.pathname;

  //doing this if /search/:name;
  const search_url_params = location.pathname.split("/")[1];

  //doing this if-block, incase if the user refreshes the page the state will vanish so we will store the previous state values in localstorage
  if (
    path !== "/" &&
    path !== "/friends" &&
    path !== "/mychat" &&
    search_url_params !== "search" &&
    path !== "/login" &&
    path !== "/signup"
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
    //this else block is for when the user logs in
  } else if (isAuth && (path === "/signup" || path === "/login")) {
    // console.log("hellllooooo");
    localStorage.setItem(
      "local_history",
      JSON.stringify({
        userid: jwtData.sub,
        fname: jwtData.fname,
        lname: jwtData.lname,
        username: jwtData.user,
        from: path,
      })
    );
  }

  // console.log(JSON.parse(localStorage.getItem("local_history")));
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

              {/* width 32% */}
            </div>
            <Menu />
          </div>
        </>
      )}

      {isAuth && (
        <Switch>
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
          <Route path="/about">
            <Resume />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      )}
      {!isAuth && (
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default Home;
