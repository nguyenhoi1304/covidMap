import React from "react";
import { shallow } from "enzyme";
import MapView from "./mapView";

describe("MapView", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MapView />);
    expect(wrapper).toMatchSnapshot();
  });
});
