import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Playground from "./playground";
import useWindowDimensions from "../../hooks/use-window-dimensions/useWindowDimensions";
import Desktop from "./desktop/desktop";
import Mobile from "./mobile/mobile";

// Mocking the Redux store
const mockStore = configureStore([]);
const useWindowDimensionsMock = useWindowDimensions as jest.Mock;

// Mocking the useWindowDimensions hook
jest.mock("../../hooks/use-window-dimensions/useWindowDimensions");

// Mocking the Desktop and Mobile components
jest.mock("./desktop/desktop", () =>
  jest.fn(() => <div>Desktop Component</div>)
);
jest.mock("./mobile/mobile", () => jest.fn(() => <div>Mobile Component</div>));

describe("Playground Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      party: { players: ["Player 1", "Player 2"] },
    });

    jest.clearAllMocks();
  });

  it("should render the Desktop component when width is greater than 868", () => {
    useWindowDimensionsMock.mockReturnValue({ width: 1024 });

    render(
      <Provider store={store}>
        <Playground />
      </Provider>
    );

    expect(screen.getByText(/Desktop Component/i)).toBeInTheDocument();
    expect(Desktop).toHaveBeenCalledWith(
      expect.objectContaining({
        players: ["Player 1", "Player 2"],
        socket: expect.any(Object),
      }),
      {}
    );
  });

  it("should render the Mobile component when width is less than or equal to 868", () => {
    useWindowDimensionsMock.mockReturnValue({ width: 768 });

    render(
      <Provider store={store}>
        <Playground />
      </Provider>
    );

    expect(screen.getByText(/Mobile Component/i)).toBeInTheDocument();
    expect(Mobile).toHaveBeenCalledWith(
      expect.objectContaining({
        players: ["Player 1", "Player 2"],
        socket: expect.any(Object),
      }),
      {}
    );
  });
});
