import React from "react";
import { shallow } from "enzyme";
import PatientInfo from "./patientInfo";

describe("PatientInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PatientInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
