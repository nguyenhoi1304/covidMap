import React from "react";
import { shallow } from "enzyme";
import PlaceSearch from "./placeSearch";

describe("PlaceSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlaceSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
