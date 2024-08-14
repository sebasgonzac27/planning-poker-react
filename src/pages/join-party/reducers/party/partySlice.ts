import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../interfaces/player";
import { Distribution } from "../../interfaces/distribution";

interface PartyState {
  partyId: string;
  partyName: string;
  userLoggedIn: boolean;
  players: Player[];
  distribution: Distribution | null;
  revealed: boolean;
  average: number;
  totalCount: Record<string, number>;
  inviteModal: boolean;
  menuModal: boolean;
}

const initialState: PartyState = {
  partyId: "",
  partyName: "",
  userLoggedIn: false,
  players: [],
  distribution: null,
  revealed: false,
  average: 0,
  totalCount: {},
  inviteModal: false,
  menuModal: false,
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
    setRevealed(state, action: PayloadAction<boolean>) {
      state.revealed = action.payload;
    },
    setAverage(state, action: PayloadAction<number>) {
      state.average = action.payload;
    },
    setTotalCount(state, action: PayloadAction<Record<string, number>>) {
      state.totalCount = action.payload;
    },
    setInviteModal(state, action: PayloadAction<boolean>) {
      state.inviteModal = action.payload;
    },
    setMenuModal(state, action: PayloadAction<boolean>) {
      state.menuModal = action.payload;
    },
  },
});

export const {
  setPartyId,
  setPartyName,
  setUserLoggedIn,
  setPlayers,
  setDistribution,
  setRevealed,
  setAverage,
  setTotalCount,
  setInviteModal,
  setMenuModal,
} = partySlice.actions;

export default partySlice.reducer;
