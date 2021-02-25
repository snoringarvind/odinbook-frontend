import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./Chat.css";
import ChatCard from "./ChatCard";

const Chat = () => {
  const location = useLocation();

  const [error, setError] = useState("");

  const { axios_request, jwtData, socket, isReadValue } = useContext(
    OdinBookContext
  );

  //this detail are of the person on whose chat btn we clicked
  const local_history = JSON.parse(localStorage.getItem("local_history"));
  let userid = local_history.userid;
  let fname = local_history.fname;
  let lname = local_history.lname;
  let username = local_history.username;

  const [tempResponse, setTempResponse] = useState([]);
  const [response, setResponse] = useState([]);
  const [msgArr, setMsgArr] = useState([]);

  const [mymsgloading, setmsgloading] = useState(true);
  const [responseloading, setresponseloading] = useState(true);

  const [myMsg, setMyMsg] = useState([]);

  const [isRead, setIsRead] = isReadValue;

  useEffect(() => {
    socket.on("new_msg", (data) => {
      setTempResponse([
        ...tempResponse,
        { message: data.message, createdAt: data.createdAt },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    if (tempResponse.length !== 0) {
      setMsgArr([...msgArr, ...tempResponse]);
    }
  }, [tempResponse]);

  useEffect(() => {
    const h = async () => {
      await Promise.all([get_responses(), get_my_messages()]);
    };
    h();
    // get_responses();
    // get_my_messages();

    save_isreadtrue();
  }, []);

  // get the messages I sent to Komal
  const get_responses = () => {
    // sender = jwtData.sub
    const route = `/chat/${userid}/${jwtData.sub}`;
    const method = "GET";

    const cb_response = (response) => {
      if (response.data.length !== 0) {
        let newArr = response.data.message_container.map((v) => ({
          ...v,
          isOwner: true,
        }));
        setResponse(newArr);
      } else {
        //it might happen that there are no sent messages.
        setResponse([{ message: "", createdAt: "" }]);
      }

      setresponseloading(false);
    };

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  // the messages Komal sent to me
  const get_my_messages = () => {
    const route = `/chat/${jwtData.sub}/${userid}`;
    const method = "GET";

    const cb_response = (response) => {
      if (response.data.length !== 0) {
        setMyMsg(response.data.message_container);
      } else {
        //it might happen that there are no response msgs and only ond side messages.
        setMyMsg([{ message: "", createdAt: "" }]);
      }
      setmsgloading(false);
    };

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (!mymsgloading && !responseloading) {
      let arr = [...response, ...myMsg];

      let sorted = arr.sort((a, b) => {
        return a.createdAt < b.createdAt
          ? -1
          : a.createdAt > b.createdAt
          ? 1
          : 0;
      });

      setMsgArr(sorted);
    }
  }, [mymsgloading, responseloading]);

  const save_isreadtrue = () => {
    const route = `/isreadtrue/${userid}`;
    const method = "PUT";
    const cb_error = (err) => {
      if (error.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    if (isRead.length > 0) {
      const is_read_index = isRead.findIndex((x) => x.user === userid);
      if (is_read_index !== -1) {
        isRead[is_read_index].isread = [];
        isRead[is_read_index].isread.push(true);
        setIsRead(isRead);
      }
    }
    //else will be... there are no messages to set to read=true
  };

  useEffect(() => {
    const element = document.querySelector(".Chat");

    const height = element.scrollHeight;

    element.scrollTo(0, height);
  }, [msgArr]);

  return (
    <div className="Chat">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          {mymsgloading && responseloading && (
            <div className="loading-container">
              <div className="spinner-border loading" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {!mymsgloading && !responseloading && (
            <ChatCard
              fname={fname}
              lname={lname}
              userid={userid}
              username={username}
              msgArr={msgArr}
              setMsgArr={setMsgArr}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
