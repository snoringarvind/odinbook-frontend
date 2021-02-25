import React, { useState } from "react";
import MyPostForm from "./MyPostForm";
import "./MyPostCreate.css";
import { useLocation } from "react-router-dom";

const MypostCreate = ({ user_post_response, createClick, setCreateClick }) => {
  // const [formBtnClicked, setFormBtnClicked] = useState(false);

  const mypost_create_route = "/myposts";
  const mypost_create_method = "POST";

  const location = useLocation();
  const fname = location.state.fname;
  const lname = location.state.lname;
  const username = location.state.username;
  return (
    <div className="MyPostCreate">
      <>
        <div className="show-form-container">
          <div className="profile-picture">{[...fname[0].toLowerCase()]}</div>
          <div
            className="show-form-btn"
            onClick={(e) => {
              e.preventDefault();
              setCreateClick(true);
            }}
          >
            What's on your mind..?
          </div>
        </div>
        {createClick && (
          <MyPostForm
            route={mypost_create_route}
            method={mypost_create_method}
            formTitle="Create Post"
            user_post_response={user_post_response}
            createClick={createClick}
            setCreateClick={setCreateClick}
          />
        )}
      </>
    </div>
  );
};

export default MypostCreate;
