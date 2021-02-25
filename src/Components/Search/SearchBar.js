import { concatSeries } from "async";
import React, { useContext, useRef, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./SearchBar.css";

const SearchBar = () => {
  const { searchValue } = useContext(OdinBookContext);
  const [searchValueChange, setSearchValueChange] = searchValue;

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ref_name.current.value);
    setSearchValueChange(true);
    if (ref_name.current.value === "") {
      return;
    } else {
      console.log(ref_name.current.value);
      return history.push(`/search/${ref_name.current.value}`);
    }
  };

  const ref_name = useRef();

  return (
    <div className="SearchBar">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="search"
          name="search"
          ref={ref_name}
          placeholder="Search Odinbook"
        />
      </form>
    </div>
  );
};

export default SearchBar;
