import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import ExploreCard from "./ExploreCard";
import uniqid from "uniqid";
import "./Explore.css";

const Explore = () => {
  const {
    axios_request,
    didMyFriendsMountValue,
    myFriendsValue,
    jwtData,
  } = useContext(OdinBookContext);
  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;
  const [myFriends, setMyFriends] = myFriendsValue;

  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const [getLoading, setGetLoading] = useState(true);
  const [get_friends_loading, setGet_friends_loading] = useState(true);

  const get_users = () => {
    let user_list_route = `/user_list`;

    const user_list_method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setResult(response.data);
      setGetLoading(false);
      // console.log(response.data);
    };

    axios_request({
      route: user_list_route,
      data: "",
      method: user_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_my_friends = () => {
    const friend_list_route = `/friend/${jwtData.sub}`;
    const friend_list_method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setGet_friends_loading(false);
    };

    const cb_response = (response) => {
      setMyFriends(response.data);
      setGet_friends_loading(false);
      // console.log(response.data);
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
    get_users();
    if (didMyFriendsMount) {
      get_my_friends();
      // console.log(75);
      setDidMyFriendsMount(false);
    } else {
      setGet_friends_loading(false);
      // console.log(78);
      return;
    }
  }, []);

  // console.log(getLoading, get_friends_loading);

  return (
    <div className="Explore">
      {error && <div className="error">{error}</div>}

      {!error && <h2 className="title-msg">People you might know.</h2>}
      {!error && !getLoading && !get_friends_loading && (
        <>
          {result.map((value, index) => {
            //we will only show users who are not my(logged-in user) friends

            const isFriend = myFriends.find((x) => x._id === value._id);
            if (!isFriend && jwtData.sub !== value._id) {
              return <ExploreCard value={value} index={index} key={uniqid()} />;
            }
          })}
        </>
      )}
    </div>
  );
};

export default Explore;
