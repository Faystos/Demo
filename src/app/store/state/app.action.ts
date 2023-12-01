import { createAction, props } from '@ngrx/store';

import { actionType } from "../type/actionType";
import {IUser} from "../../types/user.type";

export const fetchUserList = createAction(
  actionType.fetchUserList
);

export const fetchUserListSuccess = createAction(
  actionType.fetchUserListSuccess,
  props<{ userList: IUser[] }>()
);

export const fetchUserListError = createAction(
  actionType.fetchUserListError,
  props<{ httpErrorResponse: unknown }>()
);
