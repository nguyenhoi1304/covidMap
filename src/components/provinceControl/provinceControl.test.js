import React from "react";
import { shallow } from "enzyme";
import ProvinceControl from "./provinceControl";

describe("ProvinceControl", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProvinceControl />);
    expect(wrapper).toMatchSnapshot();
  });
});
