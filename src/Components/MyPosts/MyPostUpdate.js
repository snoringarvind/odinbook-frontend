import React from "react";
import MyPostForm from "./MyPostForm";

const MyPostUpdate = ({
  postid,
  updateClick,
  setUpdateClick,
  updateData,
  user_post_response,
}) => {
  const mypost_update_route = `/mypost/${postid}`;
  const mypost_update_method = "PUT";

  return (
    <div className="MyPostUpdate">
      {updateClick && (
        <MyPostForm
          route={mypost_update_route}
          update_value={updateData}
          method={mypost_update_method}
          createClick={updateClick}
          setCreateClick={setUpdateClick}
          formTitle="Update Post"
          user_post_response={user_post_response}
        />
      )}
    </div>
  );
};

export default MyPostUpdate;
