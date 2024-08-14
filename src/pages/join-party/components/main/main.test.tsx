import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import {
  setPartyId,
  setPartyName,
  setPlayers,
  setDistribution,
} from "../../reducers/party/partySlice";
import Main from "./main";
import { socket } from "../../../../utils/socket-instance/socket-instance";
import { Player } from "../../interfaces/player";
import {
  setIsOwner,
  setRole,
  setUsername,
} from "../../reducers/user/userSlice";
import { PlayerRole } from "../../enums/player-role";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../reducers/party/partySlice", () => ({
  setPartyId: jest.fn(),
  setPartyName: jest.fn(),
  setPlayers: jest.fn(),
  setDistribution: jest.fn(),
}));

jest.mock("../../reducers/user/userSlice", () => ({
  setIsOwner: jest.fn(),
  setRole: jest.fn(),
  setUsername: jest.fn(),
}));

jest.mock("../header/header", () => () => <div>Header Component</div>);
jest.mock("../new-player/new-player", () => () => (
  <div>New Player Component</div>
));
jest.mock("../playground/playground", () => () => (
  <div>Playground Component</div>
));
jest.mock("../cards/cards", () => () => <div>Cards Component</div>);
jest.mock("../stats/stats", () => () => <div>Stats Component</div>);
jest.mock("../invite/invite", () => () => <div>Invite Component</div>);

jest.mock("../../../../utils/socket-instance/socket-instance", () => ({
  socket: {
    disconnect: jest.fn(),
    on: jest.fn(),
    id: "test-socket-id",
  },
}));

describe("Main", () => {
  const mockDispatch = jest.fn();
  const partyId = "test-party-id";

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("dispatches setPartyId with the correct partyId", () => {
    render(<Main partyId={partyId} />);
    expect(mockDispatch).toHaveBeenCalledWith(setPartyId(partyId));
  });

  test("calls socket.disconnect on unmount", () => {
    const { unmount } = render(<Main partyId={partyId} />);
    unmount();
    expect(socket.disconnect).toHaveBeenCalled();
  });

  test("renders all components", () => {
    const { getByText } = render(<Main partyId={partyId} />);
    expect(getByText("Header Component")).toBeInTheDocument();
    expect(getByText("New Player Component")).toBeInTheDocument();
    expect(getByText("Playground Component")).toBeInTheDocument();
    expect(getByText("Cards Component")).toBeInTheDocument();
  });

  test("dispatches setPartyName, setDistribution, and setPlayers on join-party event", () => {
    render(<Main partyId={partyId} />);
    const party = {
      name: "Test Party",
      distribution: { id: "test", name: "test", values: [] },
    };
    const players: Player[] = [
      {
        socketId: "test-socket-id",
        username: "test-user",
        role: PlayerRole.Player,
        isOwner: true,
      },
    ];
    const joinPartyCallback = (socket.on as jest.Mock).mock.calls[0][1];
    joinPartyCallback({ party, players });

    expect(mockDispatch).toHaveBeenCalledWith(setPartyName(party.name));
    expect(mockDispatch).toHaveBeenCalledWith(
      setDistribution(party.distribution)
    );
    expect(mockDispatch).toHaveBeenCalledWith(setPlayers(players));
  });

  test("dispatches setUsername, setRole, and setIsOwner for the current player", () => {
    render(<Main partyId={partyId} />);
    const players: Player[] = [
      {
        socketId: "test-socket-id",
        username: "test-user",
        role: PlayerRole.Player,
        isOwner: true,
      },
    ];
    const joinPartyCallback = (socket.on as jest.Mock).mock.calls[0][1];
    joinPartyCallback({ party: { name: "Test Party" }, players });

    expect(mockDispatch).toHaveBeenCalledWith(setUsername("test-user"));
    expect(mockDispatch).toHaveBeenCalledWith(setRole(PlayerRole.Player));
    expect(mockDispatch).toHaveBeenCalledWith(setIsOwner(true));
  });
});
