import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import JoinParty from "./join-party";
import configureMockStore from "redux-mock-store";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("./components/main/main", () => () => <div>Main Component</div>);

const mockStore = configureMockStore();
const store = mockStore({
  /* initial state */
});

describe("JoinParty", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate to home if id is not provided", () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });

    render(
      <Provider store={store}>
        <JoinParty />
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should render Main component if id is provided", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });

    const { getByText } = render(
      <Provider store={store}>
        <JoinParty />
      </Provider>
    );

    expect(getByText("Main Component")).toBeInTheDocument();
  });
});
