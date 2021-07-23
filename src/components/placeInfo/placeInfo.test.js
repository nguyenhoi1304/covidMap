import React from "react";
import { shallow } from "enzyme";
import PlaceInfo from "./placeInfo";

describe("PlaceInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlaceInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
