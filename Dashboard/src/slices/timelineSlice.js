import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timeline: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.loading = true;
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTimelineRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTimelineRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    addTimelineSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetTimelineSlice(state) {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
    clearAllTimelineError(state) {
      state.error = null;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "https://myportfolio-1gyr.onrender.com/api/v1/timeline/getalltimeline",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.allTimelines));
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `https://myportfolio-1gyr.onrender.com/api/v1/timeline/deletetimeline/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const addTimeline = (formData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(
      "https://myportfolio-1gyr.onrender.com/api/v1/timeline/sendtimeline",
      formData,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const clearAllErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllTimelineError());
};

export const resetTimeline = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export default timelineSlice.reducer;
