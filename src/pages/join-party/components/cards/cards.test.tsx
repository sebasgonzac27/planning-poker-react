import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./cards";
import { setVote } from "../../reducers/user/userSlice";
import { vote as Vote } from "../../../../services/user/user";
import { PlayerRole } from "../../enums/player-role";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("../../../../services/user/user", () => ({
  vote: jest.fn(),
}));
jest.mock("../../../../utils/socket-instance/socket-instance", () => ({
  socket: { id: "test-socket-id" },
}));

describe("Cards Component", () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector as unknown as jest.Mock;
  const mockVote = Vote as jest.Mock;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) =>
      selector({
        user: { role: PlayerRole.Player, vote: null },
        party: {
          partyId: "test-party-id",
          distribution: { values: ["1", "2", "3"] },
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Cards component", () => {
    render(<Cards />);
    expect(screen.getByText("Elige una carta 👇")).toBeInTheDocument();
  });

  test("renders cards based on distribution values", () => {
    render(<Cards />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("handles card click and dispatches setVote", async () => {
    render(<Cards />);
    const card = screen.getByText("1");
    fireEvent.click(card);

    expect(mockDispatch).toHaveBeenCalledWith(setVote("1"));
    expect(mockVote).toHaveBeenCalledWith({
      vote: "1",
      roomId: "test-party-id",
      userId: "test-socket-id",
    });
  });

  test("handles card click to deselect vote", async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        user: { role: PlayerRole.Player, vote: "1" },
        party: {
          partyId: "test-party-id",
          distribution: { values: ["1", "2", "3"] },
        },
      })
    );

    render(<Cards />);
    const card = screen.getByText("1");
    fireEvent.click(card);

    expect(mockDispatch).toHaveBeenCalledWith(setVote(null));
    expect(mockVote).toHaveBeenCalledWith({
      vote: null,
      roomId: "test-party-id",
      userId: "test-socket-id",
    });
  });
});
