import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import ExploreCard from "./ExploreCard";

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
  const [getLoading, setGetLoading] = useState(false);
  const [get_friends_loading, setGet_friends_loading] = useState(false);

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
      setDidMyFriendsMount(false);
    } else {
      setGet_friends_loading(false);
      return;
    }
  }, []);

  return (
    <div className="Explore">
      {error && <div className="error">{error}</div>}
      {!error && getLoading && "laoding.."}
      {!error &&
        !getLoading &&
        !get_friends_loading &&
        result.map((value, index) => {
          {
            /* const check = myFriends.find */
          }

          {
            /* return <ExploreCard value={value} index={index} />; */
          }
        })}
    </div>
  );
};

export default Explore;
