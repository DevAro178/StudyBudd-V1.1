import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: null,
  authTokens: null,
  loading: false,
  userName: null,
  userEmail: null,
  isLoggedIn: false,
  userData: null,
  prevLocation: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthTokens: (state, action) => {
      state.authTokens = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setPrevLocation: (state, action) => {
      state.prevLocation = action.payload;
    },
    resetUserData: () => initialState,
  },
});

// Export actions and reducer
export const {
  setUserId,
  setUser,
  setAuthTokens,
  setLoading,
  setUserName,
  setUserEmail,
  setIsLoggedIn,
  setUserData,
  setPrevLocation,
  resetUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
