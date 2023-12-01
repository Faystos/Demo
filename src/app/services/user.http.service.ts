import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IHttpResponseUserList } from "../types/user.type";



@Injectable({providedIn: "root"})
export class UserHttpService {
  users = 'assets/userList.json'
  constructor(private http: HttpClient) {
  }

  fetchUserList() {
    return this.http.get<IHttpResponseUserList>(this.users);
  }
}
