import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import Actions from "./actions";
import { getAverage } from "../../../../../services/party/party";

// Mock useSelector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock getAverage
jest.mock("../../../../../services/party/party", () => ({
  getAverage: jest.fn(),
}));

describe("Actions Component", () => {
  const mockState = {
    party: {
      revealed: false,
      partyId: "123",
      players: [{ vote: true }, { vote: false }],
    },
    user: {
      isOwner: true,
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

  test("renders button when conditions are met", () => {
    render(<Actions />);
    const button = screen.getByText("Revelar cartas");
    expect(button).toBeInTheDocument();
  });

  test("does not render button when revealed is true", () => {
    mockState.party.revealed = true;
    render(<Actions />);
    const button = screen.queryByText("Revelar cartas");
    expect(button).not.toBeInTheDocument();
  });

  test("does not render button when isOwner is false", () => {
    mockState.user.isOwner = false;
    render(<Actions />);
    const button = screen.queryByText("Revelar cartas");
    expect(button).not.toBeInTheDocument();
  });

  test("does not render button when votesCount is 0", () => {
    mockState.party.players = [{ vote: false }, { vote: false }];
    render(<Actions />);
    const button = screen.queryByText("Revelar cartas");
    expect(button).not.toBeInTheDocument();
  });

  test("calls handleReveal on button click", async () => {
    mockState.party.players = [{ vote: true }, { vote: true }];
    mockState.party.revealed = false;
    mockState.user.isOwner = true;
    render(<Actions />);
    const button = screen.getByText("Revelar cartas");
    fireEvent.click(button);
    expect(getAverage).toHaveBeenCalledWith("123");
  });
});
