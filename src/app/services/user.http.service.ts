import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IHttpResponseUserList, IUser} from "../types/user.type";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class UserHttpService {
  users = 'assets/userList.json'
  constructor(private http: HttpClient) {
  }

  fetchUserList(): Observable<IUser[]> {
    return this.http.get<IHttpResponseUserList>(this.users).pipe(
      map((response) => response.users),
      catchError(this.handleError())
    );
  }

  private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}
