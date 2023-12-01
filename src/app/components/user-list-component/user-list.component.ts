import {Component, OnInit} from "@angular/core";

import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";

import { CreateUserComponent } from "../create-user-component/create-user.component";
import { IUser } from "../../types/user.type";
import { AppFacadeService } from "../../store/state/app.facade.service";


@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'dateRegistration', 'fullName', 'post', 'email', 'password', 'tel'];

  selection = new SelectionModel<IUser>(true, []);
  userList$ = this.appFacade.userList$;

  constructor(
    private appFacade: AppFacadeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.appFacade.fetchUserList();
  }

  onAddUser():void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  checkboxLabel(row: IUser): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
