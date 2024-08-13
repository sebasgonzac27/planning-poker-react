import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../interfaces/player";
import { Distribution } from "../../interfaces/distribution";

interface PartyState {
  partyId: string;
  partyName: string;
  userLoggedIn: boolean;
  players: Player[];
  distribution: Distribution | null;
}

const initialState: PartyState = {
  partyId: "",
  partyName: "",
  userLoggedIn: false,
  players: [],
  distribution: null,
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setPartyId(state, action: PayloadAction<string>) {
      state.partyId = action.payload;
    },
    setPartyName(state, action: PayloadAction<string>) {
      state.partyName = action.payload;
    },
    setUserLoggedIn(state, action: PayloadAction<boolean>) {
      state.userLoggedIn = action.payload;
    },
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
    setDistribution(state, action: PayloadAction<Distribution>) {
      state.distribution = action.payload;
    },
  },
});

export const {
  setPartyId,
  setPartyName,
  setUserLoggedIn,
  setPlayers,
  setDistribution,
} = partySlice.actions;

export default partySlice.reducer;
