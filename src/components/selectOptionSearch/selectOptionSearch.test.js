import React from "react";
import { shallow } from "enzyme";
import SelectOptionSearch from "./selectOptionSearch";

describe("SelectOptionSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SelectOptionSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
