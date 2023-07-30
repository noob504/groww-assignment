import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
};

const fetchRandomPhotos = createAsyncThunk(
  "photos/fetchRandomPhotos",
  async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);


const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomPhotos.fulfilled, (state, action) => {
      state.photos = [...state.photos, ...action.payload];
    });
  },
});

export { fetchRandomPhotos };
export default photoSlice.reducer;
