import React from "react";
import { shallow } from "enzyme";

import Congrats from "./congrats";
import { findByDataAttr, checkProps } from "./test/testUtils";

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Congrats {...setupProps} />);
  return wrapper;
};

test("renders without error", () => {
  const wrapper = setup();
  const congratsComponent = findByDataAttr(wrapper, "component-congrats");
  expect(congratsComponent.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup();
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
