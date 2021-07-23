import React from "react";
import { shallow } from "enzyme";
import AreaInfo from "./areaInfo";

describe("AreaInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AreaInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
