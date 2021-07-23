import React from "react";
import { shallow } from "enzyme";
import DensityNote from "./densityNote";

describe("DensityNote", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DensityNote />);
    expect(wrapper).toMatchSnapshot();
  });
});
