import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PartyState {
    partyId: string;
    partyName: string;
    userLoggedIn: boolean;
}

const initialState: PartyState = {
    partyId: "",
    partyName: "",
    userLoggedIn: false
}

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
        }
    }
})

export const { setPartyId, setPartyName, setUserLoggedIn } = partySlice.actions;

export default partySlice.reducer;