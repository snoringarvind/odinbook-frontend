import React, { useContext, useEffect, useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import uniqid from "uniqid";
import UserLikes from "./UserLikes";
import { OdinBookContext } from "../Context";
import { useLocation, Link } from "react-router-dom";
import CommentCreate from "../Comment/CommentCreate";

const UserPostCard = ({
  value,
  index,
  setPostid,
  setUpdateClick,
  setUpdateData,
  setUpdateIndex,
  indexOfCardClicked,
  setindexOfCardClicked,
  isOwner,
  setDeleteClick,
  deleteClick,
  likeLength,
  setLikeLength,
  setPostIndex,
  likeClick,
  setLikeClick,
  postsLength,
  // UserLikedIndex,
  // setUsersLikedIndex,
  path,
}) => {
  const [cardError, setCardError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentIconClicked, setCommentIconClicked] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);
  // const [newCommentLoading, setNewCommentLoading] = useState(false);
  const [onlyOneClick, setonlyOneClick] = useState(true);

  const [commentOptionIndex, setCommentOptionIndex] = useState(null);
  const { jwtData, axios_request } = useContext(OdinBookContext);

  const [userLikedIndex, setUsersLikedIndex] = useState(null);

  const location = useLocation();
  let fname;
  let lname;
  let username;
  let userid;
  if (path == "userpost") {
    fname = location.state.fname;
    lname = location.state.lname;
    username = location.state.username;
    userid = location.state.userid;
  }

  const like_post = (postid) => {
    const like_post_route = `/post/${postid}/like`;
    const like_post_method = "POST";
    const cb_error = (err) => {
      if (err.response) {
        setCardError(err.response.data);
      } else {
        setCardError(err.message);
      }
    };
    const cb_response = (response) => {};

    axios_request({
      route: like_post_route,
      data: "",
      method: like_post_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_comments = (postid) => {
    const comments_route = `/post/${postid}/comment`;
    const comments_method = "GET";

    const cb_error = (err) => {
      if (err.response) {
        setCommentError(err.response.data);
      } else {
        setCommentError(err.mesage);
      }
      setCommentsLoading(false);
    };
    const cb_response = (response) => {
      setComments(response.data);
      setCommentsLoading(false);
    };

    axios_request({
      route: comments_route,
      data: "",
      method: comments_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  let g = value.like.includes(jwtData.sub);

  const [pp, setpp] = useState(false);

  useEffect(() => {
    if (likeLength.length < postsLength) {
      likeClick.push(g);
      setLikeClick(likeClick);
      likeLength.push(value.like.length);
      setLikeLength(likeLength);
      setpp(!pp);
    }
  }, []);

  console.log(likeLength);
  //this useffect will render the page if the comment icon is clicked or there is change in comments.
  useEffect(() => {
    const element = document.querySelector(`#post-${index}`);

    if (element) {
      const height = element.scrollHeight;
      element.scrollTo(0, height);
    }
  }, [pp, commentIconClicked, commentsLoading]);

  return (
    <div className="UserPostCard">
      <div className="head">
        <div className="profile-picture">
          {fname
            ? [...fname[0].toLowerCase()]
            : [...value.user.fname[0].toLowerCase()]}
        </div>
        <div className="name-container">
          <div className="name">
            <Link
              to={{
                pathname: `/user/${value.user.username}/posts`,
                state: {
                  userid: value.user._id,
                  fname: value.user.fname,
                  lname: value.user.lname,
                  username: value.user.username,
                },
              }}
            >
              <span>{fname ? fname : value.user.fname} </span>
              <span>{lname ? lname : value.user.lname}</span>
            </Link>
          </div>

          <div className="username">
            {username ? username : value.user.username}
          </div>
        </div>
        {isOwner && (
          <div
            className="option-btn"
            onClick={(e) => {
              e.preventDefault();
              if (indexOfCardClicked == index) {
                setindexOfCardClicked(null);
              } else {
                setindexOfCardClicked(index);
              }
            }}
          >
            <div
              className="btn"
              style={{
                backgroundColor: indexOfCardClicked == index ? "darkgray" : "",
                borderRadius: "4px",
              }}
            >
              &#8942;
            </div>
            {indexOfCardClicked == index && (
              <div className="hamburger-menu">
                <div
                  className="menu-btn edit-button-container"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setindexOfCardClicked(null);
                    setUpdateClick(true);
                    setUpdateData(value);
                    setPostid(value._id);
                    setUpdateIndex(index);
                  }}
                >
                  <div className="far fa-edit icon"></div>
                  <div className="label">Edit post</div>
                </div>
                <div
                  className="menu-btn delete-btn-container"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setindexOfCardClicked(null);
                    setDeleteClick(true);
                    setPostid(value._id);
                    setUpdateIndex(index);
                  }}
                >
                  <div className="far fa-trash-alt icon"></div>
                  <div className="label">Delete post</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-content-container">
        <div className="post-title">{value.title}</div>
        <div className="post-content">{value.content_text}</div>
      </div>
      {cardError && <div className="error">{cardError}</div>}
      {!cardError && (
        <>
          <div
            className="no-like"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUsersLikedIndex(index);
            }}
          >
            <span>{likeLength[index]} </span>
            <span> {likeLength[index] == 1 ? "like" : "likes"}</span>
          </div>
          {userLikedIndex === index && (
            <UserLikes
              postid={value._id}
              userid={value.user._id}
              setUsersLikedIndex={setUsersLikedIndex}
            />
          )}
        </>
      )}
      <div className="card-footer">
        <div
          style={{
            color: likeClick[index] ? "blue" : "",
          }}
          className="like-icon far fa-thumbs-up"
          onClick={(e) => {
            e.preventDefault();
            like_post(value._id);
            if (likeClick[index] == true) {
              likeLength[index] = likeLength[index] - 1;
              setLikeLength(likeLength);
            } else {
              likeLength[index] = likeLength[index] + 1;
              setLikeLength(likeLength);
            }
            likeClick[index] = !likeClick[index];
            setLikeClick(likeClick);
            setpp(!pp);
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
      <div className="comment-list" id={`post-${index}`}>
        {commentIconClicked && commentError && (
          <div className="error">{commentError}</div>
        )}
        {commentIconClicked && !commentError && commentsLoading && "loading..."}
        {commentIconClicked &&
          !commentError &&
          !commentsLoading &&
          commentIconClicked &&
          (comments.comment_list.length == 0 ? (
            <div className="empty">This post has no comments.</div>
          ) : (
            <>
              <div className="no-comment">
                <span>{comments.comment_list.length} </span>
                <span>
                  {comments.comment_list.length == 1 ? " comment" : " comments"}
                </span>
              </div>
              {comments.comment_list.map((comment, index) => (
                <CommentCard
                  comment={comment}
                  key={uniqid()}
                  index={index}
                  postIndex={index}
                  path={path}
                  commentOptionIndex={commentOptionIndex}
                  setCommentOptionIndex={setCommentOptionIndex}
                  postid={value._id}
                  comments={comments}
                  setComments={setComments}
                  pp={pp}
                  setpp={setpp}
                />
              ))}
            </>
          ))}
        {/* 
        <div>{newCommentLoading && "loading..."}</div> */}
      </div>
      {commentIconClicked && (
        <CommentCreate
          postid={value._id}
          key={uniqid()}
          setComments={setComments}
          comments={comments}
          postIndex={index}
          pp={pp}
          setpp={setpp}
        />
      )}
    </div>
  );
};

export default UserPostCard;
