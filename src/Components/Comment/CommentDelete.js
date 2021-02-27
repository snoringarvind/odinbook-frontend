import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import "./CommentDelete.css";

const CommentDelete = ({
  postid,
  index,
  setComments,
  commentid,
  comments,
  setCommentOptionIndex,
  pp,
  setpp,
}) => {
  const { axios_request } = useContext(OdinBookContext);
  const mypost_delete_route = `/post/${postid}/comment/${commentid}`;
  const mypost_delete_method = "DELETE";

  const [postLoading, setPostLoading] = useState(false);

  const [error, setError] = useState("");

  const make_server_request = () => {
    comments[index] = comments.comment_list.splice(index, 1);

    setComments(comments);
    setpp(!pp);
    setCommentOptionIndex(null);
    const cb_error = (err) => {
      setError(err.message);
      setPostLoading(false);
    };

    const cb_response = (response) => {
      setPostLoading(false);
    };

    axios_request({
      route: mypost_delete_route,
      data: "",
      method: mypost_delete_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    make_server_request();
  }, []);

  return (
    <div className="CommentDelete">
      {error && (
        <div className="error">
          <div>{error}</div>
          <div>Please try refreshing the Page :(</div>
        </div>
      )}
    </div>
  );
};

export default CommentDelete;
