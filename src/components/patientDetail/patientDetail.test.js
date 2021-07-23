import React from "react";
import { shallow } from "enzyme";
import PatientDetail from "./patientDetail";

describe("PatientDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PatientDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
