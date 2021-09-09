import { mount } from "enzyme";
import App from "./App";
import { findByDataAttr } from "./test/testUtils";
import hookActions from "./actions/hookActions";
import React from "react";

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);

  React.useReducer = mockUseReducer;

  return mount(<App />);
};

describe("App", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByDataAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
  });
});

describe("getSecretWord calls", () => {
  test("getSecretWord calls on app mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test("getSecretWord does not call on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    //it makes app component update
    wrapper.setProps();

    /*another update trigger*/
    /*const p = findByDataAttr(wrapper, "just-for-test");
    p.simulate("click");*/

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("renders app when secretWord is not null", () => {
    const appComponent = findByDataAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const appComponent = findByDataAttr(wrapper, "spinner");
    expect(appComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not render app when secretWord is null", () => {
    const appComponent = findByDataAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });
  test("renders spinner when secretWord is null", () => {
    const appComponent = findByDataAttr(wrapper, "spinner");
    expect(appComponent.exists()).toBe(true);
  });
});
