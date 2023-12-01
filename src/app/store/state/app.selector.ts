import {createFeatureSelector, createSelector} from '@ngrx/store';

import { State } from './app.reducer';

export const selectAppState = createFeatureSelector<State>('app-store');

export const userList = createSelector(
  selectAppState,
  (state) => state.userList
);
