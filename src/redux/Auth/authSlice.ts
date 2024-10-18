// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Login API so'rovini boshqarish uchun async thunk
// export const loginUser = createAsyncThunk(
// 	"auth/loginUser",
// 	async (credentials: { username: string; password: string }, thunkAPI) => {
// 		try {
// 			const response = await axios.post(
// 				"https://13.50.240.41:8080/datingapp/api/v1/auth/authenticate",
// 				{
// 					username: credentials.username,
// 					password: credentials.password,
// 				}
// 			);
// 			const data = response.data;
// 			// Tokenni sessionStorage ga saqlash
// 			sessionStorage.setItem("token", data.data.jwtToken);
// 			sessionStorage.setItem("username", data.data.username);
// 			return data.data;
// 		} catch (error: any) {
// 			return thunkAPI.rejectWithValue("Login failed");
// 		}
// 	}
// );

// const initialState = {
// 	isAuthenticated: false,
// 	user: {
// 		username: "",
// 		profilePic: "",
// 	},
// 	loading: false,
// 	error: "",
// };

// const authSlice = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		logout: (state) => {
// 			state.isAuthenticated = false;
// 			state.user = { username: "", profilePic: "" };
// 			sessionStorage.removeItem("token");
// 			sessionStorage.removeItem("username");
// 			sessionStorage.removeItem("profilePic");
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(loginUser.pending, (state) => {
// 				state.loading = true;
// 				state.error = "";
// 			})
// 			.addCase(loginUser.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.isAuthenticated = true;
// 				state.user = {
// 					username: action.payload.username,
// 					profilePic: action.payload.profilePic || "/default.jpg",
// 				};
// 			})
// 			.addCase(loginUser.rejected, (state, action) => {
// 				state.loading = false;
// 				state.error = action.payload as string;
// 			});
// 	},
// });

// export const { login } = authSlice.actions;
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Login API so'rovini boshqarish uchun async thunk
export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials: { username: string; password: string }, thunkAPI) => {
		try {
			const response = await axios.post(
				"https://13.50.240.41:8080/datingapp/api/v1/auth/authenticate",
				{
					username: credentials.username,
					password: credentials.password,
				}
			);
			const data = response.data;
			// Tokenni sessionStorage ga saqlash
			sessionStorage.setItem("token", data.data.jwtToken);
			sessionStorage.setItem("username", data.data.username);
			return data.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue("Login failed");
		}
	}
);

const initialState = {
	isAuthenticated: false,
	user: {
		username: "",
		profilePic: "",
	},
	loading: false,
	error: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = { username: "", profilePic: "" };
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("username");
			sessionStorage.removeItem("profilePic");
		},
		// Yangi action: sessionStorage'dan userni yuklash
		loadUserFromSession: (state, action) => {
			state.isAuthenticated = true;
			state.user = {
				username: action.payload.username,
				profilePic: action.payload.profilePic,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = {
					username: action.payload.username,
					profilePic: action.payload.profilePic,
				};
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

// Faqat logoutni eksport qilish kerak
export const { logout, loadUserFromSession } = authSlice.actions;
export default authSlice.reducer;
