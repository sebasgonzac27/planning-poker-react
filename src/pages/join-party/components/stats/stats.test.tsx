import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import Stats from "./stats";

// Mock the useSelector hook
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Stats Component", () => {
  const mockState = {
    party: {
      revealed: true,
      average: 3.5,
      totalCount: {
        "Option 1": 10,
        "Option 2": 5,
      },
    },
  };

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when revealed is true", () => {
    const { getByText, queryAllByText } = render(<Stats />);

    // Check that the correct number of results are rendered
    expect(queryAllByText(/votos/).length).toBe(2);

    // Check that the average is formatted and displayed correctly
    expect(getByText("Promedio")).toBeInTheDocument();
    expect(getByText("3,5")).toBeInTheDocument();
  });

  test("does not render when revealed is false", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        party: {
          revealed: false,
          average: 0,
          totalCount: {},
        },
      })
    );

    const { container } = render(<Stats />);

    // Check that the component does not render
    expect(container.firstChild).toBeNull();
  });
});
