import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import ChatListCard from "./ChatListCard";
import uniqid from "uniqid";
import "./ChatList.css";

const ChatList = () => {
  const {
    axios_request,

    myChatListValue,
    didMyChatListMountValue,
    isReadValue,
    socket,
  } = useContext(OdinBookContext);

  const [isRead, setIsRead] = isReadValue;

  const [myChatList, setMyChatList] = myChatListValue;
  const [didMyChatListMount, setDidMyChatListMount] = didMyChatListMountValue;

  const [chatListLoading, setChatListLoading] = useState(true);
  const [isreadLoading, setIsreadLoading] = useState(true);

  const [tempIsread, settempIsread] = useState([]);
  const [ischange, setischange] = useState(false);
  const [error, setError] = useState("");

  const get_chat_list = () => {
    const route = `/mychat`;
    const method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setChatListLoading(false);
    };

    const cb_response = (response) => {
      const a = response.data.received;
      const b = response.data.sent;

      if (b.length > 0) {
        a.forEach((value) => {
          const dupl_index = b.findIndex((x) => x.user._id === value.user._id);
          if (dupl_index !== -1) {
            b.splice(dupl_index, 1);
          }
        });
      }

      const c = [...a, ...b];

      const sort_arr = c.sort((a, b) => {
        return b.last_msg < a.last_msg ? -1 : b.last_msg > a.last_msg ? 1 : 0;
      });

      setMyChatList(sort_arr);

      setChatListLoading(false);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_isread = () => {
    const route = "/isread";
    const method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setIsreadLoading(false);
    };
    const cb_response = (response) => {
      setIsRead(response.data.users);
      setIsreadLoading(false);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_response: cb_response,
      axios_error: cb_error,
    });
  };

  useEffect(() => {
    if (didMyChatListMount) {
      get_chat_list();
      get_isread();
      setDidMyChatListMount(false);
    } else {
      setIsreadLoading(false);
      setChatListLoading(false);
    }
  }, [ischange]);

  useEffect(() => {
    socket.on("new_msg", (data) => {
      settempIsread(data);
    });
  }, [socket]);

  useEffect(() => {
    if (tempIsread.length !== 0) {
      const is_read_index = isRead.findIndex(
        (x) => x.user === tempIsread.from.userid
      );
      if (is_read_index !== -1) {
        if (isRead[is_read_index].isread[0] === true) {
          isRead[is_read_index].isread.splice(0, 1);
        }
        isRead[is_read_index].isread.push(false);
      } else {
        isRead.push({ user: tempIsread.from.userid, isread: [false] });
      }
      setIsRead(isRead);

      const check = myChatList.findIndex(
        (x) => x.user._id === tempIsread.from.userid
      );

      if (check !== -1) {
        myChatList[check].last_msg = new Date().toISOString();
      } else {
        myChatList.push({
          last_msg: new Date().toISOString(),
          user: {
            fname: tempIsread.from.fname,
            lname: tempIsread.from.lname,
            username: tempIsread.from.username,
            _id: tempIsread.from.userid,
          },
        });
      }

      const sort_arr = myChatList.sort((a, b) =>
        b.last_msg < a.last_msg ? -1 : b.last_msg > a.last_msg ? 1 : 0
      );

      setMyChatList(sort_arr);
      setischange(!ischange);
    }
  }, [tempIsread]);

  return (
    <div className="ChatList">
      {error && <div className="errorr">{error}</div>}
      {!error && (
        <>
          {chatListLoading && isreadLoading && (
            <div className="loading-container">
              <div className="spinner-border loading" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {!chatListLoading &&
            !isreadLoading &&
            (myChatList.length === 0 ? (
              <div className="empty-chatlist">
                Please start a conversation with someone to see it here.
              </div>
            ) : (
              myChatList.map((value, index) => (
                <ChatListCard
                  value={value}
                  index={index}
                  key={uniqid()}
                  isRead={isRead}
                />
              ))
            ))}
        </>
      )}
    </div>
  );
};

export default ChatList;
