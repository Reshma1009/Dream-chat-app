import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userRegistationIfo")
      ? JSON.parse(localStorage.getItem("userRegistationIfo"))
      : null,
  },

  reducers: {
    usersInformation: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { usersInformation } = userSlice.actions;

export default userSlice.reducer;
