import React, { useEffect, useState } from "react";
import { useStateValue } from "../../datalayer/StateProvider";
import Input from "../input/Input";
import "./Home.css";

const Home = () => {
  const [{ schemeNumber, period, horizon }, dispatch] = useStateValue();
  const [disabledStatus, setDisabled] = useState(true);

  useEffect(() => {
    if (
      schemeNumber?.length === 6 &&
      period?.length >= 1 &&
      horizon?.length >= 1
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    console.log(disabledStatus);
  }, [schemeNumber, period, horizon]);

  const fetchApi = (param) => fetch("https://api.mfapi.in/mf/" + param);

  const handleSchemeChange = (event) => {
    if (event.target.value.length < 7) {
      dispatch({ type: "SET_SCHEMENUMBER", schemeNumber: event.target.value });
    }
  };

  const handlePeriod = (event) => {
    if (event.target.value.length < 3) {
      dispatch({ type: "SET_PERIOD", period: event.target.value });
    }
  };

  const handleHorizon = (event) => {
    if (event.target.value.length < 3) {
      dispatch({
        type: "SET_HORIZON",
        horizon: event.target.value,
      });
    }
  };

  const clickHandler = (e) => {
    console.log("inClick handler");
    fetchApi(schemeNumber)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_DATA", data: data });
        setDisabled(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <h3 className="home__mainText">Mutual Fund Information</h3>
      </div>
      <div className="home__inputBlock">
        <Input
          type="number"
          placeholder="Scheme Number"
          onChangeHandler={handleSchemeChange}
          value={schemeNumber}
          label="scheme-number"
        />
        <Input
          type="number"
          placeholder="Period"
          onChangeHandler={handlePeriod}
          value={period}
          label="period-number"
        />
        <Input
          type="number"
          placeholder="Horizon"
          onChangeHandler={handleHorizon}
          value={horizon}
          label="horizon-number"
        />
      </div>
      <button
        disabled={disabledStatus}
        onClick={clickHandler}
        style={{
          cursor: disabledStatus ? "not-allowed" : "pointer",
          backgroundColor: disabledStatus ? "gray" : "white",
        }}
      >
        Show
      </button>
    </>
  );
};

export default Home;
