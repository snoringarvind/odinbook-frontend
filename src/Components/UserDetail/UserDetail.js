import React, { useContext, useEffect } from "react";
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

  const local_history = JSON.parse(localStorage.getItem("local_history"));
  let userid = local_history.userid;
  let fname = local_history.fname;
  let lname = local_history.lname;
  let username = local_history.username;
  let from = local_history.from;

  console.log(fname);

  console.log(location);
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
            <span>{fname} </span>
            <span> {lname}</span>
          </div>
        </div>
      </div>
      <div className="UserNav">
        <UserNav
          to={`/user/${params.username}/posts`}
          fname={fname}
          lname={lname}
          userid={userid}
          username={username}
          label="Posts"
        />
        <UserNav
          to={`/user/${params.username}/about`}
          fname={fname}
          lname={lname}
          userid={userid}
          username={username}
          label="About"
        />
        <UserNav
          to={`/user/${params.username}/friends`}
          fname={fname}
          lname={lname}
          userid={userid}
          username={username}
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
