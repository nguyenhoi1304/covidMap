import React from "react";
import { shallow } from "enzyme";
import BtnListPatients from "./btnListPatients";

describe("BtnListPatients", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BtnListPatients />);
    expect(wrapper).toMatchSnapshot();
  });
});
