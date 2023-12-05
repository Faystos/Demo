import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { IUser } from "../../types/user.type";

interface FormFilterUser {
  id: FormControl<string | null>;
  fullName: FormControl<string | null>;
  post: FormControl<string | null>;
  email: FormControl<string | null>;
}

interface ValueForm {
  id: string;
  fullName: string;
  post: string;
  email: string;
}

@Component({
  selector: 'filter-user',
  templateUrl: 'filter-user.component.html',
  styleUrls: ['filter-user.component.scss']
})
export class FilterUserComponent implements OnInit{
  filterUserForm!: FormGroup<FormFilterUser>;
  $userList: IUser[] = [];

  @Input() set userList(value: IUser[]) {
    if (!value) return;
    this.$userList = value;
  };

  get userList() {
    return this.$userList;
  }

  @Output() changeFilterUsers: EventEmitter<IUser[]> = new EventEmitter<IUser[]>();

  constructor() {}

  ngOnInit() {
    this.initFormFilterUser();
  }

  onSubmitFilter() {
    const valueForm = this.filterUserForm.value as ValueForm;
    let filterUsers: IUser[] = this.userList.map((user)=> ({ ...user }));

    if (valueForm.id.length) {
      filterUsers = filterUsers.filter((user) => user.id === valueForm.id);
    }

    if (valueForm.fullName.length) {
      filterUsers = filterUsers.filter((user) => user.fullName.toLowerCase().includes(valueForm.fullName.toLowerCase()));
    }

    if (valueForm.post.length) {
      filterUsers = filterUsers.filter((user) => user.post.toLowerCase().includes(valueForm.post.toLowerCase()));
    }

    if (valueForm.email.length) {
      filterUsers = filterUsers.filter((user) => user.email.toLowerCase().includes(valueForm.email.toLowerCase()));
    }

    if (!valueForm.id.length && !valueForm.fullName.length && !valueForm.post.length && !valueForm.email.length) {
      filterUsers = [];
    }

    this.changeFilterUsers.emit(filterUsers);
  }

  private initFormFilterUser() {
    this.filterUserForm = new FormGroup({
      id: new FormControl<string>(''),
      fullName: new FormControl<string>(''),
      post: new FormControl<string>(''),
      email: new FormControl<string>('')
    });
  }
}
