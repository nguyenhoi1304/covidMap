import React from "react";
import { shallow } from "enzyme";
import MobileHeader from "./mobileHeader";

describe("MobileHeader", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MobileHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
