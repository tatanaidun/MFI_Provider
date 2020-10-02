import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

test("App rendered at first", () => {
  const { getByText, getByLabelText } = render(<Home />);

  getByText("Mutual Fund Information");
  getByLabelText("scheme-number");
  getByLabelText("period-number");
  getByLabelText("horizon-number");
});
