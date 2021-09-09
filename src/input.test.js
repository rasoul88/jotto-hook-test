import React from "react";
import { mount } from "enzyme";
import Input from "./input";
import { findByDataAttr, checkProps } from "./test/testUtils";
import LanguageContext from "./contexts/languageContext";

const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  return mount(
    <LanguageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </LanguageContext.Provider>
  );
};

describe("render Input component", () => {
  test("renders without error", () => {
    const wrapper = setup({});
    const component = findByDataAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
  });
  test("does not throw warning with exepted props", () => {
    checkProps(Input, { secretWord: "party" });
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByDataAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("correctly renders submit string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByDataAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess, wrapper;
  beforeEach(() => {
    mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    wrapper = setup({});
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
