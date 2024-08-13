import { render } from "@testing-library/react";
import Mobile from "./mobile";
import { Player as PlayerT } from "../../../interfaces/player";
import { Socket } from "socket.io-client";
import { PlayerRole } from "../../../enums/player-role";

const mockPlayers: PlayerT[] = [
  {
    socketId: "1",
    username: "Player 1",
    role: PlayerRole.Player,
    isOwner: true,
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
];

const mockSocket: Partial<Socket> = {
  id: "1",
};

describe("Mobile Component", () => {
  test("renders without crashing", () => {
    render(<Mobile players={mockPlayers} socket={mockSocket as Socket} />);
  });

  test("correctly identifies and renders my player", () => {
    const { getByText } = render(
      <Mobile players={mockPlayers} socket={mockSocket as Socket} />
    );
    expect(getByText("Player 1")).toBeInTheDocument();
  });

  test("correctly renders other players", () => {
    const { getByText } = render(
      <Mobile players={mockPlayers} socket={mockSocket as Socket} />
    );
    expect(getByText("Player 2")).toBeInTheDocument();
    expect(getByText("Player 3")).toBeInTheDocument();
  });

  test("renders the correct structure", () => {
    const { container } = render(
      <Mobile players={mockPlayers} socket={mockSocket as Socket} />
    );
    expect(container.querySelector(".content-mobile")).toBeInTheDocument();
    expect(
      container.querySelector(".content-mobile__players")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".content-mobile__my-player")
    ).toBeInTheDocument();
  });
});
