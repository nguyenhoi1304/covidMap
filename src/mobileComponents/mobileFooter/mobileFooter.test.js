import React from "react";
import { shallow } from "enzyme";
import MobileFooter from "./mobileFooter";

describe("MobileFooter", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MobileFooter />);
    expect(wrapper).toMatchSnapshot();
  });
});
