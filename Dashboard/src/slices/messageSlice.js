import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  message: null,
  messages: [],
  loading: false,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Fetch all messages
    getAllMessageRequest(state) {
      state.messages = [];
      state.loading = true;
      state.error = null;
    },
    getAllMessageSuccess(state, action) {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete a message
    deleteMessageRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset message states
    resetMessage(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    // Clear errors
    clearMessageErrors(state) {
      state.error = null;
    },
  },
});

// Asynchronous thunk action to get all messages
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessageRequest());
  try {
    const { data } = await axios.get(
      "https://myportfolio-1gyr.onrender.com/api/v1/message/getmessages",
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.getAllMessageSuccess(data.allmessages));
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessageFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

// Asynchronous thunk action to delete a message
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `https://myportfolio-1gyr.onrender.com/api/v1/message/deletemessage/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearMessageErrors()); // Clear after deletion
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

// Action to clear errors
export const clearMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearMessageErrors());
};

// Action to reset message slice
export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessage());
};

export default messageSlice.reducer;
