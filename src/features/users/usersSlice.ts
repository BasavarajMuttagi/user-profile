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
    updateUser(state, action: PayloadAction<Omit<User, "company">>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    setAvatar(
      state,
      action: PayloadAction<{ previewUrl: string; id: number }>,
    ) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          avatar: action.payload.previewUrl,
        };
      }
    },
  },
});

export const { updateUser, setUsers, setAvatar } = usersSlice.actions;

export default usersSlice.reducer;
