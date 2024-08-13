import { render } from "@testing-library/react";
import Desk from "./desk";

describe("Desk component", () => {
  it("should render the table div", () => {
    const { container } = render(<Desk />);
    expect(container.querySelector(".table")).toBeInTheDocument();
  });

  it("should render the table__middle div", () => {
    const { container } = render(<Desk />);
    expect(container.querySelector(".table__middle")).toBeInTheDocument();
  });

  it("should render the table__inner div", () => {
    const { container } = render(<Desk />);
    expect(container.querySelector(".table__inner")).toBeInTheDocument();
  });
});
