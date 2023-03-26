import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeUser",
  initialState: {
    activeChatUsers: localStorage.getItem("activeChatUser")
      ? JSON.parse(localStorage.getItem("activeChatUser"))
      : null,
  },
  reducers: {
    activeUsersInfo: (state, action) => {
      state.activeChatUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeUsersInfo } = activeChatSlice.actions;

export default activeChatSlice.reducer;
