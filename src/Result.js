import moment from "moment";
import React from "react";
import "./Result.css";

const Result = ({ dataFromApi, period, horizon }) => {
  const { meta, data, status } = dataFromApi;
  let horizonLength = horizon * 12;
  let periodLength = period * 12;

  const month = (i) => {
    var threeMonthsAgo = moment().subtract(i, "months");
    console.log(threeMonthsAgo.format("DD-MMM-YY"));
    return threeMonthsAgo.format("DD-MMM-YY");
  };

  const calculation = (date) => {
    const date1 = moment(date)
      .subtract(horizonLength, "months")
      .format("DD-MMM-YY");

    console.log(date1);

    let indexOfRequired1 = data.findIndex(
      (obj) =>
        moment(date1).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    console.log(indexOfRequired1);

    let requiredArrOfObjs1 = [];

    indexOfRequired1 >= 0 && requiredArrOfObjs1.push(data[indexOfRequired1]);

    console.log(requiredArrOfObjs1);

    while (requiredArrOfObjs1.length && !requiredArrOfObjs1[0].nav) {
      console.log("I am in while");
      requiredArrOfObjs1[0].nav = data[indexOfRequired1 + 1]?.nav;
      indexOfRequired1 += 1;
    }

    !requiredArrOfObjs1.length > 0 && (requiredArrOfObjs1 = 0);

    console.log("requiredArrOfObjs1", requiredArrOfObjs1);

    const date2 = moment(date).format("DD-MMM-YY");

    let indexOfRequired2 = data.findIndex(
      (obj) =>
        moment(date2).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    console.log(indexOfRequired2);

    let requiredArrOfObjs2 = [];

    indexOfRequired2 >= 0 && requiredArrOfObjs2.push(data[indexOfRequired2]);

    console.log(requiredArrOfObjs2);

    while (requiredArrOfObjs2.length && !requiredArrOfObjs2[0].nav) {
      requiredArrOfObjs2[0].nav = data[indexOfRequired2 + 1].nav;
      indexOfRequired2 += 1;
    }

    !requiredArrOfObjs2.length > 0 && (requiredArrOfObjs2 = 0);
    console.log("requiredArrOfObjs2", requiredArrOfObjs2);

    if (requiredArrOfObjs2 == 0 || requiredArrOfObjs1 == 0) {
      console.log("I am settin NA");
      return "NA";
    }

    const started = requiredArrOfObjs1[0].nav;
    const ended = requiredArrOfObjs2[0].nav;
    const result = (ended / started) ** (1 / horizon) - 1;
    console.log(result);
    return (result * 100).toFixed(2) + "%";
  };

  const displayStartEndNAV = (date) => {
    const date1 = moment(date)
      .subtract(horizonLength, "months")
      .format("DD-MMM-YY");

    console.log(date1);

    let indexOfRequired1 = data.findIndex(
      (obj) =>
        moment(date1).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    console.log(indexOfRequired1);

    let requiredArrOfObjs1 = [];

    indexOfRequired1 >= 0 && requiredArrOfObjs1.push(data[indexOfRequired1]);

    while (requiredArrOfObjs1.length && !requiredArrOfObjs1[0].nav) {
      console.log("I am in while");
      requiredArrOfObjs1[0].nav = data[indexOfRequired1 + 1]?.nav;
      indexOfRequired1 += 1;
    }

    !requiredArrOfObjs1.length > 0 && (requiredArrOfObjs1 = 0);
    console.log("requiredArrOfObjs1", requiredArrOfObjs1);

    const date2 = moment(date).format("DD-MMM-YY");

    let indexOfRequired2 = data.findIndex(
      (obj) =>
        moment(date2).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    let requiredArrOfObjs2 = [];

    indexOfRequired2 >= 0 && requiredArrOfObjs2.push(data[indexOfRequired2]);
    console.log(requiredArrOfObjs2);

    while (requiredArrOfObjs2.length && !requiredArrOfObjs2[0].nav) {
      requiredArrOfObjs2[0].nav = data[indexOfRequired2 + 1].nav;
      indexOfRequired2 += 1;
    }
    !requiredArrOfObjs2.length > 0 && (requiredArrOfObjs2 = 0);

    console.log("requiredArrOfObjs2", requiredArrOfObjs2);
    console.log(date1, date2);
    if (requiredArrOfObjs2 == 0 || requiredArrOfObjs1 == 0) {
      console.log("I am settin NA in displayNAV function");
      return "NA";
    }

    console.log(requiredArrOfObjs1, requiredArrOfObjs2);

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
    const listorender = [];
    for (let i = periodLength; i > 0; i--) {
      //   if (i !== 8) {
      //     continue;
      //   }
      listorender.push(
        <tbody key={i}>
          <tr>
            <td>{moment(month(i)).format("MMM-YY")}</td>
            <td>{calculation(month(i))}</td>
            <td>{displayStartEndNAV(month(i))}</td>
          </tr>
        </tbody>
      );
    }
    return listorender;
  };

  return (
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
        {/* <tr>
          <td>{month(periodLength)}</td>
          <td>{calculation()}</td>
          <td>{displayStartEndNAV()}</td>
        </tr> */}
        {/* <tbody>
          <tr>
            <td>{moment(month(periodLength)).format("MMM-YY")}</td>
            <td>{calculation(month(periodLength))}</td>
            <td>{displayStartEndNAV(month(periodLength))}</td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default Result;
