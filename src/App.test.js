import { shallow } from "enzyme";
import App from "./App";
import { findByDataAttr } from "./test/testUtils";

const setup = (state = {}) => {
  return shallow(<App />);
};

describe("App", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByDataAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
  });
});
