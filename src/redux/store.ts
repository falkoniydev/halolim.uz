// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../redux/Auth/authSlice";
// import userReducer from "../redux/User/userSlice"; // Yangi reducer qo'shildi

// const store = configureStore({
// 	reducer: {
// 		auth: authReducer,
// 		user: userReducer, // User reducer qo'shildi
// 	},
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Auth/authSlice";
import userReducer from "../redux/User/userSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
