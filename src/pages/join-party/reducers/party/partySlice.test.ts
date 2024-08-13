import partyReducer, {
  setPartyId,
  setPartyName,
  setUserLoggedIn,
  setPlayers,
  setDistribution,
} from "./partySlice";

describe("partySlice", () => {
  const initialState = {
    partyId: "",
    partyName: "",
    userLoggedIn: false,
    players: [],
    distribution: null,
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

  test("should handle setDistribution", () => {
    const actual = partyReducer(
      initialState,
      setDistribution({ id: "test-id", name: "test-name", values: [] })
    );
    expect(actual.distribution).toEqual({
      id: "test-id",
      name: "test-name",
      values: [],
    });
  });
});
