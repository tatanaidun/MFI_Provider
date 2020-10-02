import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input.js";
import "@testing-library/jest-dom/extend-expect";

test("should render input correctly ", () => {
  const propObj = {
    type: "number",
    placeholder: "test placeholder",
    onChangeHandler: () => {},
    value: 102885,
    label: "scheme-number",
  };

  const { getByLabelText } = render(<Input {...propObj} />);
  expect(getByLabelText("scheme-number")).toHaveValue(102885);
});
