import React from "react";
import { shallow } from "enzyme";
import DialogTitleCustom from "./dialogTitleCustom";

describe("DialogTitleCustom", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DialogTitleCustom />);
    expect(wrapper).toMatchSnapshot();
  });
});
