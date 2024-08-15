import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import Menu from "./menu";
import { setMenuModal } from "../../reducers/party/partySlice";
import {
  toggleAdmin,
  toggleDistribution,
} from "../../../../services/party/party";
import { PlayerRole } from "../../enums/player-role";
import { toggleRole } from "../../../../services/user/user";

jest.mock("../../../../services/party/party", () => ({
  toggleAdmin: jest.fn(),
  toggleDistribution: jest.fn(),
  getDistributions: jest.fn(() => [
    { id: "dist1", name: "Distribution 1", values: ["1", "2"] },
    { id: "dist2", name: "Distribution 2", values: ["1", "2"] },
  ]),
}));

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
  socket: {
    id: "socket123",
  },
}));

const mockStore = configureStore([]);

describe("Menu Component", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;

  const $modal = document.createElement("div");
  $modal.setAttribute("id", "modal");
  document.body.appendChild($modal);

  beforeEach(() => {
    store = mockStore({
      party: {
        menuModal: true,
        partyId: "room123",
        distribution: {
          id: "dist1",
          name: "Distribution 1",
          values: ["1", "2"],
        },
        players: [
          { socketId: "socket123", isOwner: true, username: "user1" },
          { socketId: "socket321", isOwner: false, username: "user2" },
        ],
      },
      user: { role: PlayerRole.Player, isOwner: true },
    });

    jest.clearAllMocks();

    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("should render the modal when menuModal is true", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Configuración")).toBeInTheDocument();
    });
  });

  it("should not render the modal when menuModal is false", async () => {
    store = mockStore({
      party: { menuModal: false },
      user: { role: PlayerRole.Player },
    });

    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText("Configuración")).not.toBeInTheDocument();
    });
  });

  it("should close the modal when the close button is clicked", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const closeButton = screen.getByTestId("close-button");
      fireEvent.click(closeButton);

      expect(dispatch).toHaveBeenCalledWith(setMenuModal(false));
    });
  });

  it("should render the role select and change the selected role", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const roleSelect = screen.getByTestId("role-select");
      fireEvent.change(roleSelect, { target: { value: PlayerRole.Viewer } });

      expect(roleSelect).toHaveValue(PlayerRole.Viewer);

      const saveButton = screen.getByText("Guardar");
      fireEvent.click(saveButton);

      expect(toggleRole).toHaveBeenCalledWith({
        role: PlayerRole.Viewer,
        roomId: "room123",
        userId: "socket123",
      });
    });
  });

  it("should render the admin select when user is owner", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const adminSelect = screen.getByTestId("admin-select");
      expect(adminSelect).toBeInTheDocument();
    });
  });

  it("should change the selected admin when the select changes", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const adminSelect = screen.getByTestId("admin-select");
      fireEvent.change(adminSelect, { target: { value: "socket321" } });

      expect(adminSelect).toHaveValue("socket321");

      const saveButton = screen.getByText("Guardar");
      fireEvent.click(saveButton);

      expect(toggleAdmin).toHaveBeenCalledWith("room123", "socket321");
    });
  });

  it("should render the distribution select when user is owner", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const distributionSelect = screen.getByTestId("distribution-select");
      expect(distributionSelect).toBeInTheDocument();
    });
  });

  it("should change the selected distribution when the select changes", async () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    await waitFor(() => {
      const $select = screen.getByTestId("distribution-select");
      fireEvent.change($select, { target: { value: "dist2" } });

      expect($select).toHaveValue("dist2");

      const $saveButton = screen.getByText("Guardar");
      fireEvent.click($saveButton);

      expect(toggleDistribution).toHaveBeenCalledWith("room123", "dist2");
    });
  });
});
