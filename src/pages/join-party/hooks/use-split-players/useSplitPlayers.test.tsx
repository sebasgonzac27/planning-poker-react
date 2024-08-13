import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/store";
import { Player } from "../../interfaces/player";
import useSplitPlayers from "./useSplitPlayers";
import { ReactNode } from "react";

jest.mock("../../../../utils/socket-instance/socket-instance", () => ({
  socket: { id: "mock-socket-id" },
}));

const mockStore = configureMockStore<RootState>();

import { Store } from "redux";
import { PlayerRole } from "../../enums/player-role";

const renderHookWithStore = (store: Store<RootState>) => {
  return renderHook(() => useSplitPlayers(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
};

describe("useSplitPlayers", () => {
  it("should split players into top, middle, and bottom groups", () => {
    const players: Player[] = [
      {
        username: "Player 1",
        socketId: "1",
        role: PlayerRole.Player,
        isOwner: true,
      },
      {
        username: "Player 2",
        socketId: "2",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 3",
        socketId: "3",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 4",
        socketId: "4",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 5",
        socketId: "5",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 6",
        socketId: "6",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 7",
        socketId: "7",
        role: PlayerRole.Player,
        isOwner: false,
      },
    ];

    const store = mockStore({
      party: {
        players,
        partyId: "mock-party-id",
        partyName: "Mock Party",
        userLoggedIn: true,
      },
      user: {
        username: "John Doe",
        role: PlayerRole.Player,
        isOwner: false,
      },
    });

    const { result } = renderHookWithStore(store);

    expect(result.current.topPlayers).toEqual(players.slice(0, 3));
    expect(result.current.middlePlayers).toEqual(players.slice(3, 5));
    expect(result.current.bottomPlayers).toEqual(players.slice(5, 8));
  });

  it("should exclude the player with the same socket id as the current socket", () => {
    const players: Player[] = [
      {
        username: "Player 1",
        socketId: "1",
        role: PlayerRole.Player,
        isOwner: true,
      },
      {
        username: "Player 2",
        socketId: "2",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 3",
        socketId: "3",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 4",
        socketId: "4",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 5",
        socketId: "5",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 6",
        socketId: "6",
        role: PlayerRole.Player,
        isOwner: false,
      },
      {
        username: "Player 7",
        socketId: "7",
        role: PlayerRole.Player,
        isOwner: false,
      },
    ];

    const store = mockStore({
      party: {
        players,
        partyId: "mock-party-id",
        partyName: "Mock Party",
        userLoggedIn: true,
      },
      user: {
        username: "John Doe",
        role: PlayerRole.Player,
        isOwner: false,
      },
    });

    const { result } = renderHookWithStore(store);

    const expectedPlayers = players.filter(
      (p) => p.socketId !== "mock-socket-id"
    );

    expect(result.current.topPlayers).toEqual(expectedPlayers.slice(0, 3));
    expect(result.current.middlePlayers).toEqual(expectedPlayers.slice(3, 5));
    expect(result.current.bottomPlayers).toEqual(expectedPlayers.slice(5, 8));
  });
});
