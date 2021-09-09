import React from "react";
import { shallow, mount } from "enzyme";

import Congrats from "./congrats";
import { findByDataAttr, checkProps } from "./test/testUtils";
import LanguageContext from "./contexts/languageContext";

const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in english", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });
  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setup({});
  const congratsComponent = findByDataAttr(wrapper, "component-congrats");
  expect(congratsComponent.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup({});
  const congratsComponent = findByDataAttr(wrapper, "component-congrats");
  expect(congratsComponent.text()).toBe("");
});

test("renders non-empty congrats message when `success` prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByDataAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("does not throw warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
