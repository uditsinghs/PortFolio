import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllApplicationRequest(state) {
      state.application = []; // Clear applications when request starts
      state.loading = true;
      state.error = null;
    },
    getAllApplicationSuccess(state, action) {
      state.application = action.payload; // Set fetched applications
      state.loading = false;
      state.error = null;
    },
    getAllApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload; // Set the error message
    },
    deleteApplicationRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    deleteApplicationSuccess(state, action) {
      state.message = action.payload; // Set success message
      state.loading = false;
      state.error = null;
    },
    deleteApplicationFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload; // Set the error message
    },
    addApplicationRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    addApplicationSuccess(state, action) {
      state.message = action.payload; // Set success message
      state.loading = false;
      state.error = null;
    },
    addApplicationFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload; // Set the error message
    },
    resetApplicationSlice(state) {
      state.message = null;
      state.loading = false;
      state.error = null;
      state.application = state.application;
    },
    clearAllApplicationError(state) {
      state.error = null;
    },
  },
});

// Async thunk actions
export const getAllApplication = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getAllApplicationRequest());
  try {
    const { data } = await axios.get(
      "https://myportfolio-1gyr.onrender.com/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.getAllApplicationSuccess(data.applications)
    );
  } catch (error) {
    dispatch(
      applicationSlice.actions.getAllApplicationFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteApplicationRequest());
  try {
    const { data } = await axios.delete(
      `https://myportfolio-1gyr.onrender.com/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteApplicationFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const addApplication = (formData) => async (dispatch) => {
  dispatch(applicationSlice.actions.addApplicationRequest());
  try {
    const { data } = await axios.post(
      "https://myportfolio-1gyr.onrender.com/api/v1/softwareapplication/add",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(applicationSlice.actions.addApplicationSuccess(data.message));
  } catch (error) {
    dispatch(
      applicationSlice.actions.addApplicationFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

// Clear errors
export const clearAllErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllApplicationError());
};

// Reset the state
export const resetApplication = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

// Export the reducer
export default applicationSlice.reducer;
