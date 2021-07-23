import React from "react";
import { shallow } from "enzyme";
import MarkerClickControl from "./markerClickControl";

describe("MarkerClickControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MarkerClickControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
