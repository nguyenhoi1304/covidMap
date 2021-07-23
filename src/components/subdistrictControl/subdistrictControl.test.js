import React from "react";
import { shallow } from "enzyme";
import SubdistrictControl from "./subdistrictControl";

describe("SubdistrictControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SubdistrictControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
