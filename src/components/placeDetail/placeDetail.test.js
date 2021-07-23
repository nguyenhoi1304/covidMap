import React from "react";
import { shallow } from "enzyme";
import PlaceDetail from "./placeDetail";

describe("PlaceDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlaceDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
