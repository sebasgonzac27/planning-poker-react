import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import Menu from "./menu";
import { setMenuModal } from "../../reducers/party/partySlice";
import { toggleRole } from "../../../../services/user/user";
import { PlayerRole } from "../../enums/player-role";

jest.mock("../../../../services/user/user", () => ({
  toggleRole: jest.fn(),
}));

jest.mock("../../reducers/party/partySlice", () => ({
  setMenuModal: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../../../utils/socket-instance/socket-instance", () => ({
  socket: { id: "socket123" },
}));

const mockStore = configureStore([]);

describe("Menu Component", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;
  const $modal = document.createElement("div");
  $modal.id = "modal";
  document.body.appendChild($modal);

  beforeEach(() => {
    store = mockStore({
      party: { menuModal: true, partyId: "room123" },
      user: { role: PlayerRole.Player },
    });

    jest.clearAllMocks();

    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  // Render

  it("render: should render the modal when menuModal is true", () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("render: should not render the modal when menuModal is false", () => {
    store = mockStore({
      party: { menuModal: false },
      user: { role: "player" },
    });

    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    expect(screen.queryByText("Configuración")).not.toBeInTheDocument();
  });

  it("render: should close the modal when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    const $closeButton = screen.getByTestId("close-button");
    fireEvent.click($closeButton);

    expect(dispatch).toHaveBeenCalledWith(setMenuModal(false));
  });

  // Form
  it("form: should change the selected role when the select changes", () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    const $select = screen.getByTestId("role-select");
    fireEvent.change($select, { target: { value: "viewer" } });

    expect($select).toHaveValue("viewer");
  });

  it("form: should call toggleRole and handleCloseModal on form submit when role changes", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    const $select = screen.getByTestId("role-select");
    fireEvent.change($select, { target: { value: "viewer" } });

    const $formButton = screen.getByText("Guardar");
    fireEvent.click($formButton);

    expect(toggleRole).toHaveBeenCalledTimes(1);
  });

  it("form: should not call toggleRole on form submit when role does not change", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    const $formButton = screen.getByText("Guardar");
    fireEvent.click($formButton);

    expect(toggleRole).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setMenuModal(false));
  });
});
