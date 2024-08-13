import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./header";
import { RootState } from "../../store/store";
import { PlayerRole } from "../../enums/player-role";

const mockStore = configureStore([]);
const initialState: Partial<RootState> = {
  party: {
    partyName: "Poker Night",
    partyId: "",
    userLoggedIn: false,
    players: [],
  },
  user: { username: "JohnDoe", role: PlayerRole.Player, isOwner: false },
};

describe("Header Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders the header with the logo, title, and avatar initials", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText("Pocker Pragma");
    expect(logo).toBeInTheDocument();

    const title = screen.getByText("Poker Night");
    expect(title).toBeInTheDocument();

    const avatar = screen.getByText("JO");
    expect(avatar).toBeInTheDocument();
  });

  it("renders the invite players button", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const button = screen.getByText("Invitar jugadores");
    expect(button).toBeInTheDocument();
  });

  it("renders default initials if username is not provided", () => {
    const modifiedState = {
      ...initialState,
      user: { username: "" },
    };
    store = mockStore(modifiedState);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const avatar = screen.getByText("PR");
    expect(avatar).toBeInTheDocument();
  });
});
