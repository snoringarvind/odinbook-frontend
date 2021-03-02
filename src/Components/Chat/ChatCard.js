import React, { useState, useContext, useRef } from "react";
import { OdinBookContext } from "../Context";
import ChatMap from "./ChatMap";
import uniqid from "uniqid";
import "./CharCard.css";

const ChatCard = ({ fname, lname, userid, username, msgArr, setMsgArr }) => {
  const valueRef = useRef();

  const [error, setError] = useState("");

  const { jwtData, socket, axios_request, myChatListValue } = useContext(
    OdinBookContext
  );

  const [myChatList, setMyChatList] = myChatListValue;

  const submitHandler = () => {
    // e.preventDefault();

    // const date = Date.now();

    // setMyMsg([...myMsg, { msg: state, date: date }]);

    // setSubmitMsg({ message: state, createdAt: new Date().toISOString() });

    setMsgArr([
      ...msgArr,
      {
        message: valueRef.current.value,
        createdAt: new Date().toISOString(),
        isOwner: true,
      },
    ]);

    socket.emit("send_message", {
      to: username,
      from: {
        fname: jwtData.fname,
        lname: jwtData.lname,
        username: jwtData.user,
        userid: jwtData.sub,
      },
      message: valueRef.current.value,
      createdAt: new Date().toISOString(),
    });

    const check = myChatList.findIndex((x) => x.user._id === userid);
    if (check !== -1) {
      myChatList[check].last_msg = new Date().toISOString();
    } else {
      myChatList.push({
        last_msg: new Date().toISOString(),
        user: {
          fname: fname,
          lname: lname,
          username: username,
          _id: userid,
        },
      });
    }
    const sort_arr = myChatList.sort((a, b) =>
      b.last_msg < a.last_msg ? -1 : b.last_msg > a.last_msg ? 1 : 0
    );

    setMyChatList(sort_arr);

    valueRef.current.value = "";
  };

  const save_messages_on_database = (msg) => {
    const route = `/chat/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: msg,
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  //!we are doing save_received and save_sent from the user who sent message and not by socket.io because if the other user is not online then he wont be able to make updates on his sent_received object.
  //arvind to komal msg sent
  //save my name in komal's (people from who I received message)
  const save_received = () => {
    const route = `/mychat/${jwtData.sub}/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: { last_msg: new Date().toISOString() },
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  //save Komal's name in my sent list.
  //if she already in received then we don't need this function
  //we can find this out with if the messages from both are not null
  //we will not call this request if the length of messages<=2;
  //we will call this only once because we need to delete the name from the list
  const save_sent = () => {
    const route = `/mychat/${userid}/${jwtData.sub}`;
    const method = "PUT";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: { last_msg: new Date().toISOString() },
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const save_isread_false = () => {
    const route = `/isreadfalse/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_response: cb_response,
      axios_error: cb_error,
    });
  };
  return (
    <div className="ChatCard">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="chat-map-container">
            {msgArr.map((value, index) => {
              return <ChatMap value={value} index={index} key={uniqid()} />;
            })}
          </div>
          <form autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                // onChange={changeHandler}
                ref={valueRef}
                name="msg"
                id="msg"
              />

              <div className="send-btn">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (valueRef.current.value === "") {
                      return;
                    } else {
                      save_isread_false();
                      save_received();
                      save_sent();
                      save_messages_on_database({
                        message: valueRef.current.value,
                        createdAt: new Date().toISOString(),
                      });
                      submitHandler();
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatCard;
