import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { userList } from "./app.selector";
import { addNewUser, fetchUserList } from "./app.action";
import { IUser } from "../../types/user.type";

@Injectable({providedIn: "root"})
export class AppFacadeService {
  userList$ = this.store.select(userList)

  constructor(private store: Store) {}

  fetchUserList() {
    this.store.dispatch(fetchUserList());
  }

  addNewUser(newUser: IUser) {
    this.store.dispatch(addNewUser({ newUser }))
  }
}
