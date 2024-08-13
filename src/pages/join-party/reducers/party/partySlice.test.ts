import partyReducer, {
  setPartyId,
  setPartyName,
  setUserLoggedIn,
  setPlayers,
} from "./partySlice";

describe("partySlice", () => {
  const initialState = {
    partyId: "",
    partyName: "",
    userLoggedIn: false,
    players: [],
  };

  test("should handle setPartyId", () => {
    const actual = partyReducer(initialState, setPartyId("test-party-id"));
    expect(actual.partyId).toEqual("test-party-id");
  });

  test("should handle setPartyName", () => {
    const actual = partyReducer(initialState, setPartyName("test-party-name"));
    expect(actual.partyName).toEqual("test-party-name");
  });

  test("should handle setUserLoggedIn", () => {
    const actual = partyReducer(initialState, setUserLoggedIn(true));
    expect(actual.userLoggedIn).toEqual(true);
  });

  test("should handle setPlayers", () => {
    const actual = partyReducer(initialState, setPlayers([]));
    expect(actual.players).toEqual([]);
  });
});
