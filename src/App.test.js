// test("equal to", () => {
//   expect(1 + 1).toEqual(2);
// });

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";
//import Input from "./components/input/Input";

test("App rendered at first", () => {
  const { getByText, getByLabelText, getByTestId } = render(<App />);

  getByText("Mutual Fund Information");
  getByLabelText("scheme-number");
  getByLabelText("period-number");
  getByLabelText("horizon-number");
});

// // fireEvent
test("allows users to add input", () => {
  const { getByLabelText } = render(<App />);
  const input1 = getByLabelText("scheme-number");
  const input2 = getByLabelText("period-number");
  const input3 = getByLabelText("horizon-number");
  fireEvent.change(input1, { target: { value: "102885" } });
  fireEvent.change(input2, { target: { value: "1" } });
  fireEvent.change(input3, { target: { value: "2" } });

  expect(input1.value).toBe("102885");
  expect(input2.value).toBe("1");
  expect(input3.value).toBe("2");
});

// // userEvent
// test("user-events allows users to add...", () => {
//   const { getByText, getByLabelText } = render(<App />);

//   const input = getByLabelText("What needs to be done?");
//   const button = getByText("Add #1");

//   userEvent.type(input, "Learn spanish");
//   userEvent.click(button);

//   getByText("Learn spanish");
//   getByText("Add #2");
// });

// const setup = () => {
//     const utils = render(<App />)
//     const input1 = utils.getByLabelText('cost-input')
//     return {
//       input,
//       ...utils,
//     }
//   }

//   test('It should keep a $ in front of the input', () => {
//     const { input } = setup()
//     fireEvent.change(input, { target: { value: '23' } })
//     expect(input.value).toBe('$23')
//   })
//   test('It should allow a $ to be in the input when the value is changed', () => {
//     const { input } = setup()
//     fireEvent.change(input, { target: { value: '$23.0' } })
//     expect(input.value).toBe('$23.0')
//   })

//   test('It should not allow letters to be inputted', () => {
//     const { input } = setup()
//     expect(input.value).toBe('') // empty before
//     fireEvent.change(input, { target: { value: 'Good Day' } })
//     expect(input.value).toBe('') //empty after
//   })

//   test('It should allow the $ to be deleted', () => {
//     const { input } = setup()
//     fireEvent.change(input, { target: { value: '23' } })
//     expect(input.value).toBe('$23') // need to make a change so React registers "" as a change
//     fireEvent.change(input, { target: { value: '' } })
//     expect(input.value).toBe('')
//   })
