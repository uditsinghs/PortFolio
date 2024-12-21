import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const forgotResetSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    updateProfileResetAfterUpdate(state) {
      state.message = null;
      state.error = null;
      state.isUpdated = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "https://myportfolio-1gyr.onrender.com/api/v1/user/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotResetSlice.actions.forgotPasswordSuccess(data.message));
    dispatch(forgotResetSlice.actions.clearErrors());
  } catch (error) {
    dispatch(
      forgotResetSlice.actions.forgotPasswordFailed(error.response.data.message)
    );
  }
};

export const resetPassword =
  (token, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(forgotResetSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.put(
        `https://myportfolio-1gyr.onrender.com/api/v1/user/password/reset/${token}`,
        { newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(forgotResetSlice.actions.resetPasswordSuccess(data.message));
      dispatch(forgotResetSlice.actions.clearErrors());
    } catch (error) {
      dispatch(
        forgotResetSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };
export const clearAllForgotPasswordError = () => (dispatch) => {
  dispatch(forgotResetSlice.actions.clearErrors());
};
export default forgotResetSlice.reducer;
