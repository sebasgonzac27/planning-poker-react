import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NewPlayer from "./new-player";
import usePlayerForm from "../../hooks/use-player-form/usePlayerForm";
import { PlayerRole } from "../../enums/player-role";

const mockStore = configureStore([]);

jest.mock("../../hooks/use-player-form/usePlayerForm");

describe("NewPlayer Component", () => {
  let store: ReturnType<typeof mockStore>;
  const mockUsePlayerForm = usePlayerForm as jest.MockedFunction<
    typeof usePlayerForm
  >;

  beforeEach(() => {
    store = mockStore({
      party: { userLoggedIn: false },
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

  it("modal: renders the modal when the user is not logged in", () => {
    mockUsePlayerForm.mockReturnValue({
      name: "",
      errors: [],
      role: PlayerRole.Player,
      handleNameChange: jest.fn(),
      handleRoleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(
      <Provider store={store}>
        <NewPlayer />
      </Provider>
    );

    const modal = screen.getByText(/Tu nombre/i);
    expect(modal).toBeInTheDocument();
  });

  it("modal: does not render the modal when the user is logged in", () => {
    store = mockStore({
      party: { userLoggedIn: true },
    });

    mockUsePlayerForm.mockReturnValue({
      name: "",
      errors: [],
      role: PlayerRole.Player,
      handleNameChange: jest.fn(),
      handleRoleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(
      <Provider store={store}>
        <NewPlayer />
      </Provider>
    );

    const modal = screen.queryByText(/Tu nombre/i);
    expect(modal).not.toBeInTheDocument();
  });

  it("form: disables the continue button when there are errors or no name", () => {
    mockUsePlayerForm.mockReturnValue({
      name: "",
      errors: ["Error"],
      role: PlayerRole.Player,
      handleNameChange: jest.fn(),
      handleRoleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(
      <Provider store={store}>
        <NewPlayer />
      </Provider>
    );

    const continueButton = screen.getByText(/Continuar/i);
    expect(continueButton).toBeDisabled();
  });

  it("form: calls handleSubmit when the form is submitted", () => {
    const handleSubmitMock = jest.fn();

    mockUsePlayerForm.mockReturnValue({
      name: "Player",
      errors: [],
      role: PlayerRole.Player,
      handleNameChange: jest.fn(),
      handleRoleChange: jest.fn(),
      handleSubmit: handleSubmitMock,
    });

    render(
      <Provider store={store}>
        <NewPlayer />
      </Provider>
    );

    const continueButton = screen.getByText(/Continuar/i);

    expect(continueButton).not.toBeDisabled();
    fireEvent.click(continueButton);
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
