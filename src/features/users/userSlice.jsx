import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  selectedUserId: null,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    // ADD USER
    addUser: (state, action) => {
      state.userData.push(action.payload);
    },

    // DELETE USER
    deleteUser: (state, action) => {
      state.userData = state.userData.filter(
        (user) => user.Id !== action.payload,
      );
    },

    // UPDATE USER
    updateUser: (state, action) => {
      const index = state.userData.findIndex(
        (user) => user.Id === action.payload.Id,
      );

      if (index !== -1) {
        state.userData[index] = action.payload;
      }
    },

    // SELECT USER FOR EDIT
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },

    // CLEAR SELECTED USER
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    },
  },
});

export const {
  addUser,
  deleteUser,
  updateUser,
  setSelectedUserId,
  clearSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;
