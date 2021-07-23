import React from "react";
import { shallow } from "enzyme";
import Search from "./search";

describe("Search", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});
