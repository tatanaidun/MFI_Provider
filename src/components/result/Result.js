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

    console.log(date1);
    let isDateThere1 = data.data.findIndex(
      (obj) => moment(date1).format("YYYY") == moment(obj.date).format("YYYY")
    );
    console.log(isDateThere1);
    if (isDateThere1 < 0) {
      isDateThere1 = null;
    } else {
      isDateThere1 = true;
    }
    console.log(isDateThere1);
    let indexOfRequired1 = data.data.findIndex(
      (obj) =>
        moment(date1).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    console.log(indexOfRequired1);
    let requiredArrOfObjs1 = [];

    indexOfRequired1 >= 0 &&
      requiredArrOfObjs1.push(data.data[indexOfRequired1]);
    console.log(requiredArrOfObjs1);
    !requiredArrOfObjs1.length > 0 &&
      (requiredArrOfObjs1 = [{ date: date1, nav: undefined }]);
    console.log(requiredArrOfObjs1);

    console.log(requiredArrOfObjs1);
    const date2 = moment(date).format("DD-MMM-YY");
    console.log(date2);
    let isDateThere2 = data.data.findIndex(
      (obj) => moment(date2).format("YYYY") == moment(obj.date).format("YYYY")
    );
    console.log(isDateThere2);
    if (isDateThere2 < 0) {
      isDateThere2 = null;
    } else {
      isDateThere2 = true;
    }
    console.log(isDateThere2);

    let indexOfRequired2 = data.data.findIndex(
      (obj) =>
        moment(date2).format("DD-MM-YYYY") ==
        moment(obj.date).format("DD-MM-YYYY")
    );

    console.log(indexOfRequired2);
    console.log(indexOfRequired2);
    let requiredArrOfObjs2 = [];
    console.log(requiredArrOfObjs2);
    indexOfRequired2 >= 0 &&
      requiredArrOfObjs2.push(data.data[indexOfRequired2]);
    console.log(requiredArrOfObjs2);
    !requiredArrOfObjs2.length > 0 &&
      (requiredArrOfObjs2 = [{ date: date2, nav: undefined }]);
    console.log(requiredArrOfObjs2);

    console.log(requiredArrOfObjs2);
    console.log(requiredArrOfObjs1, requiredArrOfObjs2, date1, date2);

    return {
      requiredArrOfObjs1,
      requiredArrOfObjs2,
      date1,
      date2,
      isDateThere1,
      isDateThere2,
    };
  };

  const calculation = (date) => {
    let {
      requiredArrOfObjs1,
      requiredArrOfObjs2,
      isDateThere1,
      isDateThere2,
    } = util(date);

    const check = isDateThere1 && isDateThere2;
    const started = requiredArrOfObjs1[0].nav;
    const ended = requiredArrOfObjs2[0].nav;
    const check2 = started && ended;
    const result = (ended / started) ** (1 / horizon) - 1;

    return check
      ? check2
        ? (result * 100).toFixed(2) + "%"
        : "NA"
      : "Data Not available";
  };

  const displayStartEndNAV = (date) => {
    let {
      requiredArrOfObjs1,
      requiredArrOfObjs2,
      date1,
      date2,
      isDateThere1,
      isDateThere2,
    } = util(date);

    const check = isDateThere1 && isDateThere2;
    return check ? (
      <div>
        <p>
          {requiredArrOfObjs1[0].nav
            ? parseFloat(requiredArrOfObjs1[0].nav).toFixed(2)
            : "NA"}
          -{date1}
        </p>
        <p>
          {requiredArrOfObjs2[0].nav
            ? parseFloat(requiredArrOfObjs2[0].nav).toFixed(2)
            : "NA"}
          - {date2}
        </p>
      </div>
    ) : (
      <div>
        <p>Data Not available</p>
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
    <div className="result">
      <div className="fund_details">
        <div>
          {data.meta.fund_house
            ? `Fund House : ${data.meta.fund_house}`
            : "Not Found"}
        </div>
        <div>
          {data.meta.scheme_name
            ? `Scheme Name : ${data.meta.scheme_name}`
            : "Not Found"}
        </div>
      </div>
      <div className="result_table">
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
    </div>
  ) : (
    <div />
  );
};

export default Result;
