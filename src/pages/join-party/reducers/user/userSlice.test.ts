import userReducer, {
  setUsername,
  setRole,
  setIsOwner,
  setVote,
} from "./userSlice";
import { PlayerRole } from "../../enums/player-role";

describe("userSlice", () => {
  const initialState = {
    username: "",
    role: PlayerRole.Player,
    isOwner: false,
    vote: null,
  };

  test("should handle setUsername", () => {
    const actual = userReducer(initialState, setUsername("test-username"));
    expect(actual.username).toEqual("test-username");
  });

  test("should handle setRole", () => {
    const actual = userReducer(initialState, setRole(PlayerRole.Player));
    expect(actual.role).toEqual(PlayerRole.Player);
  });

  test("should handle setIsOwner", () => {
    const actual = userReducer(initialState, setIsOwner(true));
    expect(actual.isOwner).toEqual(true);
  });

  test("should handle setVote", () => {
    const actual = userReducer(initialState, setVote("test-vote"));
    expect(actual.vote).toEqual("test-vote");
  });
});
