import { shallow } from "enzyme";
import React from "react";
import Input from "./input";
import { findByDataAttr, checkProps } from "./test/testUtils";

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

describe("render Input component", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByDataAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
  });
  test("does not throw warning with exepted props", () => {
    checkProps(Input, { secretWord: "party" });
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess, wrapper;
  beforeEach(() => {
    mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    wrapper = setup();
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByDataAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("clears state on submit button click", () => {
    const submitButton = findByDataAttr(wrapper, "submit-button");
    submitButton.simulate("click");
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
