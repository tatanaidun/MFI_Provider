import React, { useEffect, useState } from "react";
import Result from "./components/result/Result";
import "./App.css";
import { useStateValue } from "./datalayer/StateProvider";
import Home from "./components/home/Home";

const App = () => {
  const [{ data }, dispatch] = useStateValue();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="app">
      <Home />
      {data.status === "SUCCESS" &&
        (data?.data?.length > 0 ? (
          <Result />
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
