import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Invite from "./invite";

const mockStore = configureStore([]);

describe("Invite Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      party: { inviteModal: false },
    });

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("modal: does render the modal when the invite modal is true", () => {
    store = mockStore({
      party: { inviteModal: true },
    });

    render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    const modal = screen.queryByText(/Invitar jugadores/i);
    expect(modal).toBeInTheDocument();
  });

  it("modal: does not render the modal when the invite modal is false", () => {
    store = mockStore({
      party: { inviteModal: false },
    });

    render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    const modal = screen.queryByText(/Invitar jugadores/i);
    expect(modal).not.toBeInTheDocument();
  });
});
