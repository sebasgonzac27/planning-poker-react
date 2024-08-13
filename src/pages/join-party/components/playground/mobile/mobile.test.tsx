import { render, screen } from "@testing-library/react";
import { Socket } from "socket.io-client";
import { Player as PlayerT } from "../../../interfaces/player";
import { PlayerRole } from "../../../enums/player-role";
import Mobile from "./mobile";

// Mock dependencies
jest.mock("../../player/player", () => ({ player }: { player: PlayerT }) => (
  <div data-testid="player">{player.username}</div>
));
jest.mock("../actions/actions", () => () => (
  <div data-testid="actions">Actions</div>
));

// Mock socket
const mockSocket = {
  id: "mySocketId",
} as unknown as Socket;

// Sample players data
const players: PlayerT[] = [
  {
    username: "Player 1",
    socketId: "mySocketId",
    role: PlayerRole.Player,
    isOwner: true,
  },
  {
    username: "Player 2",
    socketId: "otherSocketId1",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    username: "Player 3",
    socketId: "otherSocketId2",
    role: PlayerRole.Player,
    isOwner: false,
  },
];

describe("Mobile Component", () => {
  test("renders the current player separately", () => {
    render(<Mobile players={players} socket={mockSocket} />);

    const myPlayer = screen.queryByText("Player 1");
    expect(myPlayer).toBeInTheDocument();

    const otherPlayers = screen.getAllByTestId("player");
    expect(otherPlayers).toHaveLength(3); // including the current player
  });

  test("renders other players correctly", () => {
    render(<Mobile players={players} socket={mockSocket} />);

    const otherPlayers = screen
      .getAllByTestId("player")
      .filter((player) => player.textContent !== "Player 1");
    expect(otherPlayers).toHaveLength(2);
    expect(otherPlayers[0]).toHaveTextContent("Player 2");
    expect(otherPlayers[1]).toHaveTextContent("Player 3");
  });

  test("renders the Actions component", () => {
    render(<Mobile players={players} socket={mockSocket} />);

    const actionsComponent = screen.getByTestId("actions");
    expect(actionsComponent).toBeInTheDocument();
  });

  test("does not render current player if not found", () => {
    const modifiedPlayers = players.filter((p) => p.socketId !== mockSocket.id);
    render(<Mobile players={modifiedPlayers} socket={mockSocket} />);

    const myPlayer = screen.queryByText("Player 1");
    expect(myPlayer).toBeNull();

    const otherPlayers = screen.getAllByTestId("player");
    expect(otherPlayers).toHaveLength(2);
  });
});
