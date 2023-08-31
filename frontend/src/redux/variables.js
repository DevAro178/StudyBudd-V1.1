import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: null,
  topicID: null,
};

const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setTopicID: (state, action) => {
      state.topicID = action.payload;
    },

    resetUserData: () => initialState,
  },
});

// Export actions and reducer
export const { setSearchData, setTopicID } = variablesSlice.actions;

export default variablesSlice.reducer;
