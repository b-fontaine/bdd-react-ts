import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { CircularProgress } from "@material-ui/core";

test("renders learn react link", () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
  expect(
    wrapper
      .find(CircularProgress)
      .first()
      .hasClass("center")
  ).toBe(true);
  expect(
    wrapper
      .find(CircularProgress)
      .first()
      .prop("size")
  ).toBe("10vmax");
});
