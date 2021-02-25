import React, { useContext } from "react";
import UserNav from "./UserNav";
import { Route, Switch, useParams, useLocation, Link } from "react-router-dom";
import UserAbout from "./UserAbout";
import UserPost from "./UserPost";
import UserFriend from "./UserFriend";
import "./UserDetail.css";
import { OdinBookContext } from "../Context";
import UserDetailFriendBtn from "./UserDetailFriendBtn";

const UserDetail = () => {
  const location = useLocation();
  let params = useParams();

  const { jwtData } = useContext(OdinBookContext);

  let userid;
  let fname;
  let lname;
  let username;
  if (location.state.userid) {
    fname = location.state.fname;
    lname = location.state.lname;
    username = location.state.username;
    userid = location.state.userid;
  }

  return (
    <div className="UserDetail">
      <div className="user-banner-container">
        <div className="user-banner">
          {params.username}
          <div className="banner-btn">
            {userid && userid !== jwtData.sub && (
              <div className="chat-link-container">
                <Link
                  to={{
                    pathname: "/chat",
                    state: {
                      userid: userid,
                      fname: fname,
                      lname: lname,
                      username: username,
                    },
                  }}
                >
                  <div className="chat-btn fab fa-facebook-messenger"></div>
                </Link>
              </div>
            )}
            {userid && userid !== jwtData.sub && <UserDetailFriendBtn />}
          </div>
        </div>

        <div className="name-container">
          <div className="name">
            <span>{location.state.fname} </span>
            <span> {location.state.lname}</span>
          </div>
        </div>
      </div>
      <div className="UserNav">
        <UserNav
          to={`/user/${params.username}/posts`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="Posts"
        />
        <UserNav
          to={`/user/${params.username}/about`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="About"
        />
        <UserNav
          to={`/user/${params.username}/friends`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="Friends"
        />
      </div>
      <Switch>
        <Route path={`/user/${params.username}/posts`}>
          <UserPost path="userpost" />
        </Route>
        <Route path={`/user/${params.username}/about`}>
          <UserAbout />
        </Route>
        <Route path={`/user/${params.username}/friends`}>
          <UserFriend />
        </Route>
      </Switch>
    </div>
  );
};

export default UserDetail;
