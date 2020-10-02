import moment from "moment";
import React, { useEffect } from "react";
import { useStateValue } from "../../datalayer/StateProvider";
import "./Result.css";

const Result = () => {
  const [{ data, period, horizon }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("In Resultjs");
  }, [data]);

  let horizonLength = horizon * 12;
  let periodLength = period * 12;

  const month = (i) => {
    let date = moment().subtract(i, "months");
    return date.format("DD-MMM-YY");
  };

  const util = (date) => {
    const date1 = moment(date)
      .subtract(horizonLength, "months")
      .format("DD-MMM-YY");

    let indexOfRequired1 = data.data.findIndex(
      (obj) =>
        moment(date1).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    let requiredArrOfObjs1 = [];

    indexOfRequired1 >= 0 &&
      requiredArrOfObjs1.push(data.data[indexOfRequired1]);

    while (requiredArrOfObjs1.length && !requiredArrOfObjs1[0].nav) {
      requiredArrOfObjs1[0].nav = data.data[indexOfRequired1 + 1]?.nav;
      indexOfRequired1 += 1;
    }

    !requiredArrOfObjs1.length > 0 && (requiredArrOfObjs1 = 0);

    const date2 = moment(date).format("DD-MMM-YY");

    let indexOfRequired2 = data.data.findIndex(
      (obj) =>
        moment(date2).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    let requiredArrOfObjs2 = [];

    indexOfRequired2 >= 0 &&
      requiredArrOfObjs2.push(data.data[indexOfRequired2]);

    while (requiredArrOfObjs2.length && !requiredArrOfObjs2[0]?.nav) {
      requiredArrOfObjs2[0].nav = data.data[indexOfRequired2 + 1].nav;
      indexOfRequired2 += 1;
    }

    !requiredArrOfObjs2.length > 0 && (requiredArrOfObjs2 = 0);

    return { requiredArrOfObjs1, requiredArrOfObjs2, date1, date2 };
  };

  const calculation = (date) => {
    let { requiredArrOfObjs1, requiredArrOfObjs2 } = util(date);
    if (requiredArrOfObjs2 == 0 || requiredArrOfObjs1 == 0) {
      return "NA";
    }

    const started = requiredArrOfObjs1[0].nav;
    const ended = requiredArrOfObjs2[0].nav;
    const result = (ended / started) ** (1 / horizon) - 1;

    return (result * 100).toFixed(2) + "%";
  };

  const displayStartEndNAV = (date) => {
    let { requiredArrOfObjs1, requiredArrOfObjs2, date1, date2 } = util(date);
    if (requiredArrOfObjs2 == 0 || requiredArrOfObjs1 == 0) {
      return "NA";
    }

    return (
      <div>
        <p>
          {parseFloat(requiredArrOfObjs1[0].nav).toFixed(2)} - {date1}
        </p>
        <p>
          {parseFloat(requiredArrOfObjs2[0].nav).toFixed(2)} - {date2}
        </p>
      </div>
    );
  };

  const printData = () => {
    const listToRender = [];
    for (let i = periodLength; i > 0; i--) {
      listToRender.push(
        <tbody key={i}>
          <tr>
            <td>{moment(month(i)).format("MMM-YY")}</td>
            <td>{calculation(month(i))}</td>
            <td>{displayStartEndNAV(month(i))}</td>
          </tr>
        </tbody>
      );
    }
    return listToRender;
  };

  return data.data.length > 0 ? (
    <div className="result__table">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Returns</th>
            <th>Calculation</th>
          </tr>
        </thead>
        {printData()}
      </table>
    </div>
  ) : (
    <div />
  );
};

export default Result;
