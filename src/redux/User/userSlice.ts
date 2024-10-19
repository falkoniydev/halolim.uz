import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// User ma'lumotlarini olish uchun async thunk
export const fetchUserData = createAsyncThunk(
	"user/fetchUserData",
	async (_, thunkAPI) => {
		const token = sessionStorage.getItem("token");
		if (!token) {
			return thunkAPI.rejectWithValue("No token found");
		}
		try {
			const response = await axios.get(
				"https://13.50.240.41:8080/datingapp/api/v1/user_info/get/user_profile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue("Failed to fetch user data");
		}
	}
);

interface UserData {
	data: {
		firstName?: string;
		lastName?: string;
		profilePic: string;
		age: number;
		gender: string;
	};
	firstName?: string;
	lastName?: string;
	profilePic: string;
}

const initialState = {
	data: {
		firstName: "",
		lastName: "",
		profilePic: "",
	} as UserData,
	loading: false,
	error: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default userSlice.reducer;
