import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  user: {},
};

const fetchUser = createAsyncThunk("user/fetchUser", async (username) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/users/${username}/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    return {};
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export { fetchUser };
export default userSlice.reducer;
