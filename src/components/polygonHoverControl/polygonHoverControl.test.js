import React from "react";
import { shallow } from "enzyme";
import PolygonHoverControl from "./polygonHoverControl";

describe("PolygonHoverControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PolygonHoverControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
