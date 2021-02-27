import React, { useEffect, useState, useContext, useRef } from "react";
import { OdinBookContext } from "../Context";

const UseraAboutCard = ({
  objkey,
  index,
  clickIndex,
  setClickIndex,
  result,
  setResult,
  ee,
  setee,
  jwtData,
  userid,
}) => {
  const { myAboutValue, axios_request } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;

  const [error, setError] = useState("");

  const [tooltip, setTooltip] = useState(false);
  const [empty_name, setEmpty_name] = useState(false);

  const [state, setState] = useState({ [objkey]: ee[objkey] });

  const str = {
    bio: "Bio",
    nickName: "Nick-name",
    school: "School",
    college: "College",
    working: "Work Place",
    relationshipStatus: "Relationhsip Status",
    book: "Book",
    food: "Food",
    gender: "Gender",
    dob: "Date of birth",
    email: "Email",
    phone: "Phone",
  };
  const changeHandler = (e) => {
    e.preventDefault();
    const element = document.getElementById(objkey);

    const { name, value } = e.target;

    if (element.tagName == "INPUT") {
      const element_id = element.id;
      const arr = [...value];
      if (element_id !== "food" && element_id !== "book") {
        if (arr.length >= 30) {
          setTooltip(true);
          return;
        } else {
          setTooltip(false);
        }
      } else if (element_id == "food" || element_id == "book") {
        if (arr.length >= 50) {
          setTooltip(true);
          return;
        } else {
          setTooltip(false);
        }
      }
    }

    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const route = "/myprofile";
    const method = "PUT";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {};

    if (state.fname === "" || state.lname === "") {
      return;
    }

    axios_request({
      route: route,
      data: state,
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (clickIndex == index) {
      const element = document.getElementById(objkey);
      element.focus();
      element.style.border = "1px solid blue";
      element.style.boxShadow = "0.3px 0.3px 5px blue";
      element.style.outline = "none";
      const savediv = document.getElementById(`save-icon-${index}`);
      savediv.style.color = "blue";
    }
  }, []);

  return (
    <div className="UserAboutCard">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <div className="form-group">
              <label htmlFor={objkey}>{str[objkey]}</label>
              <div className="container">
                {clickIndex != index && (
                  <div className="profile-values">
                    {ee[objkey] || `No ${str[objkey]} added`}
                  </div>
                )}
                {clickIndex == index &&
                  objkey !== "relationshipStatus" &&
                  objkey !== "gender" &&
                  objkey !== "dob" &&
                  objkey !== "bio" && (
                    <input
                      name={objkey}
                      id={objkey}
                      value={state[objkey]}
                      onChange={changeHandler}
                      maxLength={
                        objkey == "food" || objkey == "book" ? "50" : "30"
                      }
                    />
                  )}

                {tooltip == true && (
                  <div className="input-tooltip">
                    <>
                      <span>No more than </span>
                      {objkey == "food" || objkey == "book" ? "50" : "30"}
                      <span> characters :)</span>{" "}
                    </>
                  </div>
                )}
                {clickIndex == index && objkey == "bio" && (
                  <div className="bio-container">
                    <textarea
                      name="bio"
                      id="bio"
                      value={state[objkey]}
                      onChange={changeHandler}
                    />
                  </div>
                )}

                {clickIndex == index && objkey == "dob" && (
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    selected={state[objkey] ? null : ""}
                    // onChange={changeHandler}
                    start
                  />
                )}
                {clickIndex == index && objkey == "relationshipStatus" && (
                  <select
                    id="relationshipStatus"
                    name="relationshipStatus"
                    onChange={changeHandler}
                    defaultValue={ee[objkey]}
                  >
                    <option value="Status">Status</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="It's complicated">It's complicated</option>
                    <option value="In a relationship">In relationship</option>
                    <option value="Open Relationship">Open Relationship</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                )}
                {clickIndex == index && objkey === "gender" && (
                  <select
                    id="gender"
                    name="gender"
                    onChange={changeHandler}
                    defaultValue={ee[objkey]}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Gender Neutral"> Gender Neutral</option>
                    <option value="Non Binary">Non Binary</option>
                  </select>
                )}
              </div>
              {userid === jwtData.sub && clickIndex !== index && (
                <div
                  className="edit-icon fas fa-edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setClickIndex(index);
                  }}
                ></div>
              )}
              {jwtData.sub === userid && clickIndex == index && (
                <div
                  id={`save-icon-${index}`}
                  className="save-icon fas fa-save"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (state.fname == "" || state.lname == "") {
                      setEmpty_name(true);
                    } else {
                      setClickIndex(null);
                      ee[objkey] = state[objkey];
                      setee(ee);
                      myAbout[objkey] = state[objkey];
                      setMyAbout(myAbout);
                      submitHandler(e);
                      setEmpty_name(false);
                    }
                  }}
                ></div>
              )}

              {empty_name && (
                <div className="empty_name">
                  {state.fname == ""
                    ? "First name cannot be empty"
                    : "Last name cannot be empty"}
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UseraAboutCard;
