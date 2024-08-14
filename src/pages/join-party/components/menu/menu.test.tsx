import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Menu from "./menu";
// import { toggleRole } from "../../../../services/user/user";
// import { setMenuModal } from "../../reducers/party/partySlice";

jest.mock("../../../../services/user/user", () => ({
  toggleRole: jest.fn(),
}));

jest.mock("../../reducers/party/partySlice", () => ({
  setMenuModal: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Menu Component", () => {
  let store: ReturnType<typeof mockStore>;
  const $modal = document.createElement("div");
  $modal.id = "modal";
  document.body.appendChild($modal);

  beforeEach(() => {
    store = mockStore({
      party: { menuModal: true, partyId: "room123" },
      user: { role: "player" },
    });
  });

  it("should render the modal when menuModal is true", () => {
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("should not render the modal when menuModal is false", () => {
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
});
