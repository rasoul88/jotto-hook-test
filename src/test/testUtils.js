import checkPropTypes from "check-prop-types";

export const findByDataAttr = (wrapper, dataAttr) => {
  return wrapper.find(`[data-test='${dataAttr}']`);
};

export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes, confirmingProps, "prop", component.name);
  expect(propError).toBeUndefined();
};
