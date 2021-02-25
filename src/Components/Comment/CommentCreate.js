import React from "react";
import CommentForm from "./CommentForm";

const CommentCreate = ({
  postid,
  setComments,
  postIndex,
  comments,
  pp,
  setpp,
}) => {
  const route = `/post/${postid}/comment`;
  const method = "POST";
  return (
    <div className="CommentCreate">
      <CommentForm
        setComments={setComments}
        postIndex={postIndex}
        route={route}
        method={method}
        comments={comments}
        pp={pp}
        setpp={setpp}
      />
    </div>
  );
};

export default CommentCreate;
