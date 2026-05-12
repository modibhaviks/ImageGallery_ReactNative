import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type AuthState = {
  users: User[];
  loggedInUser: User | null;
};

const initialState: AuthState = {
  users: [],
  loggedInUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      const userExists = state.users.find(
        user => user.email === action.payload.email,
      );

      if (!userExists) {
        state.users.push(action.payload);

        // Auto login after registration
        state.loggedInUser = action.payload;
      }
    },

    loginUser: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>,
    ) => {
      const user = state.users.find(
        item =>
          item.email === action.payload.email &&
          item.password === action.payload.password,
      );

      if (user) {
        state.loggedInUser = user;
      }
    },

    logoutUser: state => {
      state.loggedInUser = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
