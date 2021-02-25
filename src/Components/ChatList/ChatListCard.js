import React from "react";
import { Link } from "react-router-dom";

const ChatListCard = ({ value, index, isRead }) => {
  let no_unread_msgs;
  for (let i = 0; i < isRead.length; i++) {
    if (isRead[i].user === value.user._id) {
      if (isRead[i].isread[0] == true) {
        break;
      } else {
        no_unread_msgs = isRead[i].isread.length;
      }
    }
  }

  const minute = new Date(value.last_msg).getMinutes();
  const hour = new Date(value.last_msg).getHours();
  const date = new Date(value.last_msg).getDate();
  const month = new Date(value.last_msg).getMonth() + 1;
  const year = new Date(value.last_msg).getFullYear();
  const splityear = [...year.toString()];

  return (
    <div className="ChatListCard">
      <Link
        to={{
          pathname: "/chat",
          state: {
            userid: value.user._id,
            fname: value.user.fname,
            lname: value.user.lname,
            username: value.user.username,
          },
        }}
      >
        <div className="profile-picture">
          {[...value.user.fname][0].toLowerCase()}
        </div>
        <div className="name">
          <div>
            <span>{value.user.fname} </span>
            <span>{value.user.lname} </span>
          </div>
        </div>
        <div className="read-container">
          <div className="read">
            <div className={no_unread_msgs ? "show-read isread" : "show-read"}>
              {no_unread_msgs || ""}
            </div>
          </div>
          <div className="date-container">
            <div className="date">
              <span>{date}/</span>

              <span>{month}/</span>

              <span>{splityear[2]}</span>
              <span>{splityear[3]}</span>
            </div>

            <div className="time">
              <span>{hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:</span>

              <span>{minute < 10 ? "0" + minute : minute}</span>
              <span>{hour > 12 ? "pm" : "am"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatListCard;
