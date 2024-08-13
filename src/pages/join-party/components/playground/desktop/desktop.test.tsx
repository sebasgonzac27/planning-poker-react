import { render } from "@testing-library/react";
import Desktop from "./desktop";
import { Player as PlayerT } from "../../../interfaces/player";
import { Socket } from "socket.io-client";
import { PlayerRole } from "../../../enums/player-role";

const mockPlayers: PlayerT[] = [
  {
    socketId: "1",
    username: "Player 1",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "2",
    username: "Player 2",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "3",
    username: "Player 3",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "4",
    username: "Player 4",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "5",
    username: "Player 5",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "6",
    username: "Player 6",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    socketId: "7",
    username: "Player 7",
    role: PlayerRole.Player,
    isOwner: false,
  },
];

const mockSocket: Partial<Socket> = {
  id: "1",
};

describe("Desktop Component", () => {
  test("renders without crashing", () => {
    render(<Desktop players={mockPlayers} socket={mockSocket as Socket} />);
  });

  test("correctly assigns players to containers", () => {
    const { getByText } = render(
      <Desktop players={mockPlayers} socket={mockSocket as Socket} />
    );

    // Check top players
    expect(getByText("Player 2")).toBeInTheDocument();
    expect(getByText("Player 3")).toBeInTheDocument();
    expect(getByText("Player 4")).toBeInTheDocument();
    expect(getByText("Player 5")).toBeInTheDocument();

    // Check left players
    expect(getByText("Player 6")).toBeInTheDocument();

    // Check right players
    expect(getByText("Player 7")).toBeInTheDocument();

    // Check bottom players
    expect(getByText("Player 1")).toBeInTheDocument();
  });

  test("renders the correct structure", () => {
    const { container } = render(
      <Desktop players={mockPlayers} socket={mockSocket as Socket} />
    );
    expect(container.querySelector(".content-desktop")).toBeInTheDocument();
    expect(
      container.querySelector(".content-desktop__top-players")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".content-desktop__middle-area")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".content-desktop__side-players")
    ).toBeInTheDocument();
  });
});
