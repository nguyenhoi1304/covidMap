import React from "react";
import { shallow } from "enzyme";
import ListBlockadeAreas from "./listBlockadeAreas";

describe("ListBlockadeAreas", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListBlockadeAreas />);
    expect(wrapper).toMatchSnapshot();
  });
});
