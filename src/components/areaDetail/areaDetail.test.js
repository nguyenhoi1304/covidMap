import React from "react";
import { shallow } from "enzyme";
import AreaDetail from "./areaDetail";

describe("AreaDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AreaDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
