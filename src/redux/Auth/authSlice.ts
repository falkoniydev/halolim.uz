import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Login API request
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
			sessionStorage.setItem("token", data.data.jwtToken);
			sessionStorage.setItem("username", data.data.username);
			return data.data;
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Login failed");
			return thunkAPI.rejectWithValue("Login failed");
		}
	}
);

// Tokenni yangilash uchun thunk
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
	const token = sessionStorage.getItem("token"); // Yoki localStorage.getItem("token")

	const response = await axios.post(
		`https://your-api-url/api/v1/token/refresh_token`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`, // Tokenni headerda yuborish
			},
		}
	);

	return response.data;
});

const initialState = {
	isAuthenticated: false,

	user: {
		username: "",
		profilePic: "",
	},
	loading: false,
	error: "",
	successMessage: "", // Yana bir state: muvaffaqiyatli xabarlar
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

export const { logout, loadUserFromSession } = authSlice.actions;
export default authSlice.reducer;
