import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { SelectionModel } from "@angular/cdk/collections";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";

import { CreateUserComponent } from "../create-user-component/create-user.component";
import { IUser } from "../../types/user.type";
import { AppFacadeService } from "../../store/state/app.facade.service";
import { UserSortService } from "../../services/user.sort.service";

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  subUserList$!: Subscription
  displayedColumns: string[] = ['select', 'id', 'dateRegistration', 'fullName', 'post', 'email', 'password', 'tel'];
  selection = new SelectionModel<IUser>(true, []);
  userList$ = this.AppFacadeService.userList$;
  userList: IUser[] = [];
  paginationUserList:IUser[] = [];
  startIndex = 0
  maxIndex = 5

  constructor(
    private AppFacadeService: AppFacadeService,
    private userSortService: UserSortService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subUserList$ = this.userList$.subscribe((list) => {
      this.userList = list;
      this.paginationUserList = this.getPaginationList(this.startIndex, this.maxIndex);
    })

    this.AppFacadeService.fetchUserList();
  }

  ngOnDestroy() {
    if (this.subUserList$) {
      this.subUserList$.unsubscribe();
    }
  }

  onAddUser():void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.AppFacadeService.addNewUser(result);
      }
    });
  }

  onFilterUserList(event: IUser[]) {
    if (!event.length) {
      this.paginationUserList = this.getPaginationList(this.startIndex, this.maxIndex).map((user) => ({ ...user }));
      return
    }
    this.paginationUserList = event;
  }

  handlePageEvent(evt: PageEvent):void {
    const previousPageIndex = evt.previousPageIndex as number;
    const pageIndex = evt.pageIndex as number;

    if (pageIndex > previousPageIndex) {
      this.startIndex += evt.pageSize;
      this.maxIndex += evt.pageSize;
    }

    if (pageIndex < previousPageIndex) {
      this.startIndex -= evt.pageSize;
      this.maxIndex -= evt.pageSize;
    }

    this.paginationUserList = this.getPaginationList(this.startIndex, this.maxIndex);
  }

  checkboxLabel(row: IUser): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  announceSortChange(event: { active: string; direction: 'asc' | 'desc' | '' }) {
    const sortItems = this.getPaginationList(this.startIndex, this.maxIndex).map((user) => ({ ...user }));

    if (event.active === 'id') {
      this.paginationUserList = this.userSortService.sortUserById(event, sortItems);
    }

    if (event.active === 'dateRegistration') {
      this.paginationUserList = this.userSortService.sortUserByDate(event, sortItems);
    }

    if (event.active === 'fullName') {
      this.paginationUserList = this.userSortService.sortUserByFullName(event, sortItems);
    }
  }

  private getPaginationList(start: number, end: number) {
    return this.userList.slice(start, end)
  }
}
