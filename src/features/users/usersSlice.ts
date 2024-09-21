import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { updateUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
