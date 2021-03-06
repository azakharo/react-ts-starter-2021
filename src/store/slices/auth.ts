import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import api from '@/services/ApiService';
import {saveState} from '@/helpers/persistState';
import {AppThunk, RootState} from '@/store';

interface User {
  name: string;
}

interface AuthState {
  isInProgress: boolean;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User | {};
  error: string | null;
}

const initialState: AuthState = {
  isInProgress: false,
  isAuthenticated: false,
  user: {},
  error: null,
};

//* ********************************************************
// Selectors

const selectAuth = (wholeState: RootState) => wholeState.auth;
export const selectError = (state: RootState): string | null =>
  selectAuth(state).error;
export const selectIsInProgress = (state: RootState): boolean =>
  selectAuth(state).isInProgress;
export const selectIsAuthenticated = (state: RootState): boolean =>
  selectAuth(state).isAuthenticated;
// eslint-disable-next-line @typescript-eslint/ban-types
export const selectUser = (state: RootState): User | {} =>
  selectAuth(state).user;
export const selectUsername = (state: RootState): string => {
  const user = selectUser(state);

  if (!user) {
    return '';
  }

  return (user as User).name;
};

// Selectors
//* ********************************************************

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart() {
      return {
        ...initialState,
        isInProgress: true,
      };
    },
    loginSuccess(state, action: PayloadAction<User>) {
      return {
        ...initialState,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    loginFail(state, action: PayloadAction<string>) {
      return {
        ...initialState,
        error: action.payload,
      };
    },
    logout() {
      return {
        ...initialState,
      };
    },
  },
});

export const {reducer} = slice;

export const login =
  (username: string, password: string): AppThunk<Promise<void>> =>
  dispatch => {
    dispatch(slice.actions.loginStart());

    return api.login(username, password).then(
      // Do not need to return anything from this method
      // eslint-disable-next-line promise/always-return
      user => {
        saveState({
          auth: {
            isAuthenticated: true,
            user,
          },
        });

        dispatch(slice.actions.loginSuccess(user));
      },
      error => {
        // Sure api method returns std error with the message field
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dispatch(slice.actions.loginFail(error.message));
      },
    );
  };

export const logout = (): AppThunk => dispatch => {
  saveState({
    auth: {
      isAuthenticated: false,
      user: {},
    },
  });

  dispatch(slice.actions.logout());

  return api.logout();
};

export default slice;
