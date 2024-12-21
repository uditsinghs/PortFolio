import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import forgotPasswordReducer from "../slices/forgotResetPasswordSlice";
import messageReducer from "../slices/messageSlice";
import timelineReducer from "../slices/timelineSlice";
import skillReducer from "../slices/skillSlice";
import applicationReducer from "../slices/applicationSlice";
import projectReducer from "../slices/projectSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    application: applicationReducer,
    project: projectReducer,
  },
});
