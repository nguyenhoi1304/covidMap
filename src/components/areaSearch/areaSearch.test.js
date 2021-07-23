import React from "react";
import { shallow } from "enzyme";
import AreaSearch from "./areaSearch";

describe("AreaSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AreaSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
