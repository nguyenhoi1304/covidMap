import React from "react";
import { shallow } from "enzyme";
import DialogCard from "./dialogCard";

describe("DialogCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DialogCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
