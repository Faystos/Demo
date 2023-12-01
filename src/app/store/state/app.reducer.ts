import { createReducer, on } from '@ngrx/store';
import {IUser} from "../../types/user.type";
import {addNewUser, fetchUserList, fetchUserListError, fetchUserListSuccess} from "./app.action";

export interface State {
  userList: IUser[] | [];
  userListLoading: boolean;
  userListError: unknown;
}

export const initialState: State = {
  userList: [],
  userListLoading: false,
  userListError: undefined
};

export const reducer = createReducer(
  initialState,
  on(
    fetchUserList,
    (state: State): State => ({
      ...state,
      userListLoading: true
    })
  ),
  on(
    fetchUserListSuccess,
    (state: State, { userList }): State => ({
      ...state,
      userList,
      userListLoading: false,
      userListError: undefined
    })
  ),
  on(
    fetchUserListError,
    (state: State, { httpErrorResponse }): State => ({
      ...state,
      userList: [],
      userListLoading: false,
      userListError: httpErrorResponse
    })
  ),
  on(
    addNewUser,
    (state: State, { newUser }): State => ({
      ...state,
      userList: [...state.userList, newUser],
      userListLoading: false,
      userListError: undefined
    })
  )
)
