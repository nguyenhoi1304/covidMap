import React from "react";
import { shallow } from "enzyme";
import LocationDetail from "./locationDetail";

describe("LocationDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LocationDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
