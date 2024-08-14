import { render } from "@testing-library/react";
import Player from "./player";
import { Player as PlayerT } from "../../interfaces/player";
import { PlayerRole } from "../../enums/player-role";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/store";

const mockStore = configureMockStore<RootState>();

describe("Player component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      party: {
        revealed: true,
        partyId: "1",
        partyName: "Poker Night",
        userLoggedIn: false,
        players: [],
        distribution: null,
        average: 0,
        totalCount: {},
        inviteModal: false,
      },
      user: {
        username: "JohnDoe",
        role: PlayerRole.Player,
        isOwner: false,
        vote: null,
      },
    });
  });

  it("should render the player's vote if the role is Player and revealed is true", () => {
    const player: PlayerT = {
      socketId: "1",
      username: "JohnDoe",
      role: PlayerRole.Player,
      vote: 5,
      isOwner: false,
    };

    const { getByText } = render(
      <Provider store={store}>
        <Player player={player} />
      </Provider>
    );

    expect(getByText("5")).toBeInTheDocument();
  });

  it("should not render the player's vote if the role is Player and revealed is false", () => {
    const player: PlayerT = {
      socketId: "1",
      username: "JohnDoe",
      role: PlayerRole.Player,
      vote: 5,
      isOwner: false,
    };

    store = mockStore({
      ...store.getState(),
      party: { ...store.getState().party, revealed: false },
    });

    const { queryByText } = render(
      <Provider store={store}>
        <Player player={player} />
      </Provider>
    );

    expect(queryByText("5")).not.toBeInTheDocument();
  });

  it("should render the player's initials if the role is Viewer", () => {
    const player: PlayerT = {
      socketId: "2",
      username: "JaneDoe",
      role: PlayerRole.Viewer,
      vote: undefined,
      isOwner: false,
    };

    const { getByText } = render(
      <Provider store={store}>
        <Player player={player} />
      </Provider>
    );

    expect(getByText("JA")).toBeInTheDocument();
  });

  it("should render the player's username", () => {
    const player: PlayerT = {
      socketId: "3",
      username: "Alice",
      role: PlayerRole.Player,
      vote: undefined,
      isOwner: false,
    };

    const { getByText } = render(
      <Provider store={store}>
        <Player player={player} />
      </Provider>
    );

    expect(getByText("Alice")).toBeInTheDocument();
  });
});
