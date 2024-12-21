import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [],
    singleProject: {},
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    getAllProjectRequest(state) {
      state.project = [];
      state.loading = true;
      state.error = false;
    },
    getAllProjectSuccess(state, action) {
      state.project = action.payload;
      state.loading = false;
      state.error = false;
    },
    getAllProjectFailed(state, action) {
      state.project = state.project;
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = false;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = false;
    },
    deleteProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = false;
    },
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    addProjectRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = false;
    },
    addProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = false;
    },
    addProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    getSingleProjectRequest(state) {
      state.singleProject = {};
      state.loading = true;
      state.error = false;
    },
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
      state.loading = false;
      state.error = false;
    },
    getSingleProjectFailed(state, action) {
      state.singleProject = state.singleProject;
      state.loading = false;
      state.error = action.payload;
    },
    resetProjectSlice(state) {
      state.message = null;
      state.loading = false;
      state.error = null;
      state.project = state.project;
    },
    clearAllProjectError(state) {
      state.error = null;
    },
  },
});

export const getAllProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const { data } = await axios.get(
      "https://myportfolio-1gyr.onrender.com/api/v1/project/getall",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `https://myportfolio-1gyr.onrender.com/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};
export const updateProject = (formData, id) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `https://myportfolio-1gyr.onrender.com/api/v1/project/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const addProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addProjectRequest());
  try {
    const { data } = await axios.post(
      "https://myportfolio-1gyr.onrender.com/api/v1/project/add",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(projectSlice.actions.addProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.addProjectSuccess(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const getSingleProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.getSingleProjectRequest());
  try {
    const { data } = await axios.get(
      `https://myportfolio-1gyr.onrender.com/api/v1/project/get/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getSingleProjectSuccess(data.singleProject));
  } catch (error) {
    dispatch(
      projectSlice.actions.getSingleProjectFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

// Clear errors
export const clearAllErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllProjectError());
};

// Reset the state
export const resetProject = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
