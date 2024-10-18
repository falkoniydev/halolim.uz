// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer, // auth reducer qo'shildi
	},
});

export type RootState = ReturnType<typeof store.getState>; // RootState typing
export type AppDispatch = typeof store.dispatch; // AppDispatch typing
export default store;
