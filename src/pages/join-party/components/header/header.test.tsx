import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./header";
import { setInviteModal, setMenuModal } from "../../reducers/party/partySlice";

const mockStore = configureStore([]);

jest.mock("../../reducers/party/partySlice", () => ({
  setInviteModal: jest.fn(),
  setMenuModal: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Header Component", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      user: { username: "John Doe" },
      party: { partyName: "Poker Night" },
    });

    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
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

  it("handles click event on invite players button", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const inviteButton = screen.getByText(/Invitar jugadores/i);
    fireEvent.click(inviteButton);

    expect(dispatch).toHaveBeenCalledWith(setInviteModal(true));
  });

  it("handles click event on avatar", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const avatar = screen.getByText("JO");
    fireEvent.click(avatar);

    expect(dispatch).toHaveBeenCalledWith(setMenuModal(true));
  });
});
