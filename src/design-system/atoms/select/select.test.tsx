import Select from "./select.atom";
import { render, screen } from "@testing-library/react";

describe("Select component", () => {
  it("render: should render a select element", () => {
    render(
      <Select label="Select" name="select" id="select">
        <option value="lab1">lab1</option>
      </Select>
    );

    const select = screen.getByLabelText("Select");
    const option = screen.getByText("lab1");
    expect(select).toBeInTheDocument();
    expect(option).toBeInTheDocument();
  });
});
