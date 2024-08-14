import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./header";

const mockStore = configureStore([]);

describe("Header Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      user: { username: "John Doe" },
      party: { partyName: "Poker Night" },
    });
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
    store = mockStore({
      user: { username: "" },
      party: { partyName: "Poker Night" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const avatar = screen.getByText("PR");
    expect(avatar).toBeInTheDocument();
  });
});
