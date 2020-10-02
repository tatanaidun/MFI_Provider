import React, { useEffect, useState } from "react";
import Result from "./Result";
import "./App.css";
import Input from "./components/input/Input";

const App = () => {
  const [schemeNumber, setSchemeNumber] = useState();
  //const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState({});
  const [period, setPeriod] = useState();
  const [horizon, setHorizon] = useState();
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

  // useEffect(() => {
  //   isClicked &&
  //     fetch("https://api.mfapi.in/mf/" + schemeNumber)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // returns(data.data);
  //         setData(data);
  //         setIsClicked(false);
  //         setDisabled(true);
  //       })
  //       .catch((err) => console.log(err));
  // }, [isClicked]);

  const fetchApi = (param) => {
    return fetch("https://api.mfapi.in/mf/" + param);
  };

  const handleSchemeChange = (event) => {
    if (event.target.value.length < 7) {
      setSchemeNumber(event.target.value);
    }
  };

  const handlePeriod = (event) => {
    if (event.target.value.length < 3) {
      setPeriod(event.target.value);
    }
  };

  const handleHorizon = (event) => {
    if (event.target.value.length < 3) {
      setHorizon(event.target.value);
    }
  };

  // const yearsDiffFunc = (d1, d2) => {
  //   console.log(d2.split("-")[2]);
  //   let date1 = new Date(d1.split("-")[2], d1.split("-")[1], d1.split("-")[0]);
  //   let date2 = new Date(d2.split("-")[2], d2.split("-")[1], d2.split("-")[0]);
  //   let yearsDiff = date2.getFullYear() - date1.getFullYear();
  //   return yearsDiff;
  // };

  // const returns = (data) => {
  //   let date1 = data[data.length - 1].date;
  //   let date2 = data[0].date;

  //   console.log("I am here", date1, date2);
  //   let yearsDiff = yearsDiffFunc(date1, date2);
  //   console.log(yearsDiff);
  //   const started = data[data.length - 1].nav;
  //   const ended = data[0].nav;
  //   const result = (ended / started) ** (1 / yearsDiff) - 1;
  //   console.log(result);
  // };

  const clickHandler = (e) => {
    console.log("inClick handler");
    fetchApi(schemeNumber)
      .then((response) => response.json())
      .then((data) => {
        // returns(data.data);
        setData(data);
        setDisabled(true);
      })
      .catch((err) => console.log(err));
    // setIsClicked(true);
  };

  return (
    <div className="app">
      <div>
        <h3 className="app__mainText">Mutual Fund Information</h3>
      </div>
      <div className="app__inputBlock">
        <Input
          id={1}
          type="number"
          placeholder="Scheme Number"
          onChangeHandler={handleSchemeChange}
          value={schemeNumber}
          label="scheme-number"
        />
        <Input
          id={2}
          type="number"
          placeholder="Period"
          onChangeHandler={handlePeriod}
          value={period}
          label="period-number"
        />
        <Input
          id={3}
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
      {data.status === "SUCCESS" &&
        (data?.data?.length > 0 ? (
          <div>
            <Result dataFromApi={data} period={period} horizon={horizon} />
          </div>
        ) : (
          <div className="result__error">
            <span>Data related to respective number is not available </span>
            <span>Please search with new scheme number</span>
          </div>
        ))}
    </div>
  );
};

export default App;
