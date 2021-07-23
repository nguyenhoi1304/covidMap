import React from "react";
import { shallow } from "enzyme";
import PlaceTypeControl from "./placeTypeControl";

describe("PlaceTypeControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlaceTypeControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
