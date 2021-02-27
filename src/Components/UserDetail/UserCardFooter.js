import React from "react";

const UserCardFooter = ({
  commentIconClicked,
  setCommentIconClicked,
  likeClick,
  setLikeClick,
  index,
  value,
  get_comments,
  setonlyOneClick,
  onlyOneClick,
  like_post,
}) => {
  // console.log(likeClick);
  return (
    <div className="UserCardFooter">
      <div className="card-footer">
        <div
          style={{
            color: likeClick[index] ? "blue" : "",
          }}
          className="like-icon far fa-thumbs-up"
          onClick={(e) => {
            e.preventDefault();
            likeClick[index] = !likeClick[index];
            setLikeClick(likeClick);

            like_post(value._id);
          }}
        ></div>

        <div
          className="comment-icon far fa-comment-alt"
          onClick={(e) => {
            e.preventDefault();
            //get comments only once no need to fetch on every click.
            if (onlyOneClick) {
              get_comments(value._id);
              setonlyOneClick(false);
            }
            setCommentIconClicked(!commentIconClicked);
          }}
        ></div>
        <div className="share-icon far fa-share-square"></div>
      </div>
    </div>
  );
};

export default UserCardFooter;
