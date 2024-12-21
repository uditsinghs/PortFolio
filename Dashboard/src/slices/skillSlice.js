import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skill: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillRequest(state) {
      state.skill = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillSuccess(state, action) {
      state.skill = action.payload;
      state.loading = false;
      state.error = null;
    },

    getAllSkillFailed(state, action) {
      state.skill = state.skill;
      state.loading = false;
      state.error = action.payload;
    },

    deleteSkillRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    deleteSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },

    deleteSkillFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateSkillRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    updateSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateSkillFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    addSkillRequest(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    addSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },

    addSkillFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    resetSkillSlice(state) {
      state.skill = state.skill;
      state.message = null;
      state.loading = false;
      state.error = null;
    },
    clearAllSkillError(state) {
      state.error = null;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      "https://myportfolio-1gyr.onrender.com/api/v1/skill/getall",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
  } catch (error) {
    dispatch(
      skillSlice.actions.getAllSkillFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `https://myportfolio-1gyr.onrender.com/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.deleteSkillFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const addSkill = (formData) => async (dispatch) => {
  dispatch(skillSlice.actions.addSkillRequest());
  try {
    const { data } = await axios.post(
      "https://myportfolio-1gyr.onrender.com/api/v1/skill/add",
      formData,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.addSkillSuccess(data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.addSkillFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const updateSkill = (proficiency, id) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.put(
      `https://myportfolio-1gyr.onrender.com/api/v1/skill/update/${id}`,
      proficiency,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.updateSkillFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const clearAllErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllSkillError());
};

export const resetSkill = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
