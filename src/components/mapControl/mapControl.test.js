import React from "react";
import { shallow } from "enzyme";
import MapControl from "./mapControl";

describe("MapControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MapControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
