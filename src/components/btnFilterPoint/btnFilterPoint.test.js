import React from "react";
import { shallow } from "enzyme";
import BtnFilterPoint from "./btnFilterPoint";

describe("BtnFilterPoint", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BtnFilterPoint />);
    expect(wrapper).toMatchSnapshot();
  });
});
