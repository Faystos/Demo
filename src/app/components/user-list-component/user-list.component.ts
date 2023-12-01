import { Component } from "@angular/core";
import { map } from "rxjs";

import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";

import { CreateUserComponent } from "../create-user-component/create-user.component";
import { UserHttpService } from "../../services/user.http.service";
import { IUser } from "../../types/user.type";

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})
export class UserListComponent {
  displayedColumns: string[] = ['select', 'id', 'dateRegistration', 'fullName', 'post', 'email', 'password', 'tel'];

  selection = new SelectionModel<IUser>(true, []);
  userList$ = this.userHttpService.fetchUserList().pipe(
    map((list) => list.users)
  );

  constructor(
    private userHttpService: UserHttpService,
    public dialog: MatDialog
  ) {}

  onAddUser():void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  checkboxLabel(row: IUser): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
