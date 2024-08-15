import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import Invite from "./invite";
import { setInviteModal } from "../../reducers/party/partySlice";
import { toast } from "sonner";

const mockStore = configureStore([]);

jest.mock("../../reducers/party/partySlice", () => ({
  setInviteModal: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("Invite Component", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      party: { inviteModal: false },
    });

    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

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

  it("handleCloseModal: dispatches setInviteModal with false", () => {
    store = mockStore({
      party: { inviteModal: true },
    });

    render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(dispatch).toHaveBeenCalledWith(setInviteModal(false));
  });

  it("handleCopyLink: copies the URL to clipboard and dispatches setInviteModal with false on success", async () => {
    store = mockStore({
      party: { inviteModal: true },
    });

    render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    const copyButton = screen.getByText(/Copiar en el portapapeles/i);
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      window.location.href
    );
    await navigator.clipboard.writeText(window.location.href);
    expect(toast.success).toHaveBeenCalledWith(
      "Se ha copiado el link al portapapeles."
    );
    expect(dispatch).toHaveBeenCalledWith(setInviteModal(false));
  });

  it("handleCopyLink: shows error toast on clipboard write failure", async () => {
    navigator.clipboard.writeText = jest
      .fn()
      .mockRejectedValue(new Error("Failed to copy"));

    store = mockStore({
      party: { inviteModal: true },
    });

    render(
      <Provider store={store}>
        <Invite />
      </Provider>
    );

    const copyButton = screen.getByText(/Copiar en el portapapeles/i);
    fireEvent.click(copyButton);

    await navigator.clipboard.writeText(window.location.href).catch(() => {}); // Simulate async clipboard write failure

    expect(toast.error).toHaveBeenCalledWith(
      "No se ha podido copiar el link al portapapeles."
    );
  });
});
