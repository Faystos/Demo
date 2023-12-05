import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { UserHttpService } from "../../services/user.http.service";
import { fetchUserList, fetchUserListError, fetchUserListSuccess } from "./app.action";

@Injectable()
export class AppEffect {
  fetchUserList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUserList),
      mergeMap(() =>
        this.userHttpService.fetchUserList().pipe(
          map((response) => {
            return fetchUserListSuccess({ userList: response })
          }),
          catchError((httpErrorResponse) => {
            return of(fetchUserListError({ httpErrorResponse }))
          })
        )
      )
    )
  });

  constructor(
    private actions$: Actions,
    private userHttpService: UserHttpService
  ) {}
}
