import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import { Link } from "react-router-dom";
import uniqid from "uniqid";

const MyPostList = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");

  const [posts, setPosts] = useState([]);
  const [getLoading, setGetLoading] = useState(true);

  const mypost_list_route = "/myposts";
  const mypost_list_method = "GET";

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
      setPosts(response.data);
      setGetLoading(false);
    };
    axios_request({
      route: mypost_list_route,
      data: "",
      method: mypost_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const display_posts = () => {
    const arr = [];

    for (let i = 0; i < posts.length; i++) {
      arr.push(
        <div className="card" key={uniqid()}>
          <Link to={`/mypost/${posts[i]._id}`}>
            <div className="title">{posts[i].title}</div>
            <div className="content_text">{posts[i].content_text}</div>
          </Link>
        </div>
      );
    }
    return arr;
  };

  return (
    <div className="MyPostList">
      {getLoading && "loading.."}
      {!getLoading && (
        <>{error ? <div className="error">{error}</div> : display_posts()}</>
      )}
    </div>
  );
};

export default MyPostList;
