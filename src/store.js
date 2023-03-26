import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import activeChatUsers from "./slices/activeChatUsers";
export default configureStore({
  reducer: {
    allUserSInfo: userSlices,
    allActiveChatUsers: activeChatUsers,
  },
});
