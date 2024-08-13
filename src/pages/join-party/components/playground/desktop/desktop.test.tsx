import { render, screen } from "@testing-library/react";
import Desktop from "./desktop";
import { Socket } from "socket.io-client";
import { Player as PlayerT } from "../../../interfaces/player";
import { PlayerRole } from "../../../enums/player-role";

// Mock del componente Player
jest.mock("../../player/player", () => ({ player }: { player: PlayerT }) => (
  <div data-testid="player">{player.username}</div>
));

// Mock del componente Desk
jest.mock("../desk/desk", () => () => <div data-testid="desk">Desk</div>);

// Mock del socket
const mockSocket = {
  id: "mySocketId",
} as unknown as Socket;

// Datos de ejemplo para los jugadores
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
  {
    username: "Player 4",
    socketId: "otherSocketId3",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    username: "Player 5",
    socketId: "otherSocketId4",
    role: PlayerRole.Player,
    isOwner: false,
  },
  {
    username: "Player 6",
    socketId: "otherSocketId5",
    role: PlayerRole.Player,
    isOwner: false,
  },
];

describe("Desktop Component", () => {
  test("renders the current player in the bottom zone", () => {
    render(<Desktop players={players} socket={mockSocket} />);

    const bottomPlayers = screen
      .getAllByTestId("player")
      .filter((player) => player.textContent === "Player 1");
    expect(bottomPlayers).toHaveLength(1);
  });

  test("distributes other players across top, left, and right zones", () => {
    render(<Desktop players={players} socket={mockSocket} />);

    const otherPlayers = screen
      .getAllByTestId("player")
      .filter((player) => player.textContent !== "Player 1");
    expect(otherPlayers).toHaveLength(players.length - 1);
  });

  test("renders the Desk component in the middle", () => {
    render(<Desktop players={players} socket={mockSocket} />);

    const desk = screen.getByTestId("desk");
    expect(desk).toBeInTheDocument();
  });

  test("handles cases with fewer players than the maximum capacity", () => {
    const fewerPlayers = players.slice(0, 4);
    render(<Desktop players={fewerPlayers} socket={mockSocket} />);

    const renderedPlayers = screen.getAllByTestId("player");
    expect(renderedPlayers).toHaveLength(fewerPlayers.length);
  });

  test("handles cases with more players than the maximum capacity", () => {
    const morePlayers = [...players, ...players]; // Duplicating the players for the test
    render(<Desktop players={morePlayers} socket={mockSocket} />);

    const renderedPlayers = screen.getAllByTestId("player");
    expect(renderedPlayers).toHaveLength(players.length * 2 - 1); // As defined by the maxSizes array in the component
  });
});
