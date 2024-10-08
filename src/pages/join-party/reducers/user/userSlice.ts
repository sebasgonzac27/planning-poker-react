import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerRole } from "../../enums/player-role";

interface UserState {
  username: string;
  role: PlayerRole;
  isOwner: boolean;
  vote: string | null;
}

const initialState: UserState = {
  username: "",
  role: PlayerRole.Player,
  isOwner: false,
  vote: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setRole(state, action: PayloadAction<PlayerRole>) {
      state.role = action.payload;
    },
    setIsOwner(state, action: PayloadAction<boolean>) {
      state.isOwner = action.payload;
    },
    setVote(state, action: PayloadAction<string | null>) {
      state.vote = action.payload;
    },
  },
});

export const { setUsername, setRole, setIsOwner, setVote } = userSlice.actions;

export default userSlice.reducer;
