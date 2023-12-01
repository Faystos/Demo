import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {userList} from "./app.selector";
import {fetchUserList} from "./app.action";

@Injectable({providedIn: "root"})
export class AppFacadeService {
  userList$ = this.store.select(userList)

  constructor(private store: Store) {}

  fetchUserList() {
    this.store.dispatch(fetchUserList());
  }


}
