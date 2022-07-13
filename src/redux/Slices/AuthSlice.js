import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
  userData: {},
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      return {
        ...state,
        userData: action.payload
      }
    },
    userGetData: (state, action) => {
      return {
        ...state,
        userList: action.payload
      }
    },
  }
});

export const { storeUserData, userGetData } = AuthSlice.actions;

export default AuthSlice.reducer;

