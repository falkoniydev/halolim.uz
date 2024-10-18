import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: true,
	user: {
		username: "",
		profilePic: "",
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = { username: "", profilePic: "" };
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
