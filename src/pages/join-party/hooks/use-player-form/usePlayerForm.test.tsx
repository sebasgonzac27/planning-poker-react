import { RootState } from "../../store/store";
import { PlayerRole } from "../../enums/player-role";
import configureStore from "redux-mock-store";
import usePlayerForm from "./usePlayerForm";
import { act, ReactNode } from "react";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import { validateInput } from "../../../../utils/validate-input/validate-input";
import { socket } from "../../../../utils/socket-instance/socket-instance";
import { handleError } from "../../../../utils/handle-error/handle-error";

const mockStore = configureStore([]);
const initialState: Partial<RootState> = {
  party: {
    partyName: "Poker Night",
    partyId: "",
    userLoggedIn: false,
    players: [],
    distribution: null,
    revealed: false,
    average: 0,
    totalCount: {},
  },
  user: {
    username: "JohnDoe",
    role: PlayerRole.Player,
    isOwner: false,
    vote: null,
  },
};

const validateInputMock = validateInput as jest.Mock;

jest.mock("../../../../utils/socket-instance/socket-instance");

jest.mock("../../../../utils/handle-error/handle-error");

jest.mock("../../../../utils/validate-input/validate-input");

describe("usePlayerForm", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it("should return the initial state", () => {
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    expect(result.current.name).toBe("");
    expect(result.current.role).toBe(PlayerRole.Player);
    expect(result.current.errors).toEqual([]);
  });

  it("should update the name state", () => {
    validateInputMock.mockReturnValue([]);

    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleNameChange({
        target: { value: "JohnDoe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.name).toBe("JohnDoe");
  });

  it("should set the errors when the name is incorrect", () => {
    validateInputMock.mockReturnValue(["error"]);

    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleNameChange({
        target: { value: "Jon" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.errors).toEqual(["error"]);
  });

  it("should update the role state", () => {
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleRoleChange({
        target: { value: PlayerRole.Player },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.role).toBe(PlayerRole.Player);
  });

  it("should not submit the form when there are errors", () => {
    validateInputMock.mockReturnValue(["error"]);
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleNameChange({
        target: { value: "Jon" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(socket.emit).not.toHaveBeenCalled();
    expect(handleError).toHaveBeenCalledTimes(1);
  });

  it("should submit the form when there are no errors", () => {
    validateInputMock.mockReturnValue([]);
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleNameChange({
        target: { value: "JohnDoe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(socket.emit).toHaveBeenCalledTimes(1);
    expect(socket.emit).toHaveBeenCalledWith("join-party", {
      partyId: initialState.party!.partyId,
      name: "JohnDoe",
      role: PlayerRole.Player,
    });

    expect(store.getActions()).toEqual([
      { type: "user/setUsername", payload: "JohnDoe" },
      { type: "user/setRole", payload: PlayerRole.Player },
      { type: "party/setUserLoggedIn", payload: true },
    ]);
  });
});
