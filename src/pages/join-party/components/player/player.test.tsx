import { render } from "@testing-library/react";
import Player from "./player";
import { Player as PlayerT } from "../../interfaces/player";
import { PlayerRole } from "../../enums/player-role";

describe("Player component", () => {
  it("should render the player's vote if the role is Player", () => {
    const player: PlayerT = {
      socketId: "1",
      username: "JohnDoe",
      role: PlayerRole.Player,
      vote: 5,
      isOwner: false,
    };

    const { getByText } = render(<Player player={player} />);

    expect(getByText("5")).toBeInTheDocument();
  });

  it("should render the player's initials if the role is Viewer", () => {
    const player: PlayerT = {
      socketId: "2",
      username: "JaneDoe",
      role: PlayerRole.Viewer,
      vote: undefined,
      isOwner: false,
    };

    const { getByText } = render(<Player player={player} />);

    expect(getByText("JA")).toBeInTheDocument();
  });

  it("should render the player's username", () => {
    const player: PlayerT = {
      socketId: "3",
      username: "Alice",
      role: PlayerRole.Player,
      vote: undefined,
      isOwner: false,
    };

    const { getByText } = render(<Player player={player} />);

    expect(getByText("Alice")).toBeInTheDocument();
  });
});
