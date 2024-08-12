import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setPartyId } from "../../reducers/party/partySlice";
import Main from "./main";
import { socket } from "../../../../utils/socket-instance/socket-instance";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../reducers/party/partySlice", () => ({
  setPartyId: jest.fn(),
}));

jest.mock("../header/header", () => () => <div>Header Component</div>);
jest.mock("../new-player/new-player", () => () => (
  <div>New Player Component</div>
));
jest.mock("../../../../utils/socket-instance/socket-instance", () => ({
  socket: {
    disconnect: jest.fn(),
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

  test("renders Header and NewPlayer components", () => {
    const { getByText } = render(<Main partyId={partyId} />);
    expect(getByText("Header Component")).toBeInTheDocument();
    expect(getByText("New Player Component")).toBeInTheDocument();
  });
});
