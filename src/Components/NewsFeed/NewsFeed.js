import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import NewsFeedCard from "./NewsFeedCard";
// import "./NewsFeed.css";

const NewsFeed = () => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  const [result, setResult] = useState("");

  const [newsfeedLikedIndex, setNewsFeedLikedIndex] = useState(null);

  const post_list_route = "/news-feed";
  const post_list_method = "GET";

  useEffect(() => {
    make_server_request();
  }, []);

  const make_server_request = () => {
    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setResult(response.data);
      setGetLoading(false);
      console.log(response.data);
    };

    axios_request({
      route: post_list_route,
      data: "",
      method: post_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const display_posts = () => {
    let arr = [];
    console.log(result);
    if (result.length === 0) {
      return <div className="empty">No Posts to show</div>;
    } else {
      for (let i = 0; i < result.length; i++) {
        arr.push(<div className="card" key={uniqid()}></div>);
      }
      return arr;
    }
  };

  return (
    <div className="NewsFeed">
      {getLoading && "loading..."}
      {!getLoading && (
        <>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            result.map((value, index) => {
              return (
                <NewsFeedCard
                  value={value}
                  index={index}
                  key={uniqid()}
                  newsfeedLikedIndex={newsfeedLikedIndex}
                  setNewsFeedLikedIndex={setNewsFeedLikedIndex}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default NewsFeed;
