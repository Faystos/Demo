import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface IUserForm {
  dateRegistration: FormControl<Date | '' | null>;
  fullName: FormControl<string | null>;
  post: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>
  tel: FormControl<string | null>
}

@Component({
  selector: 'create-user-form',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  addUserForm!: FormGroup<IUserForm>;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) {}

  ngOnInit() {
    this.initFormAddUser();
  }

  onSubmit() {
    if (this.addUserForm.status === "INVALID") return;
    this.dialogRef.close({ ...this.addUserForm.value as IUser });
  }

  private initFormAddUser() {
    this.addUserForm = new FormGroup({
      dateRegistration: new FormControl<Date | ''>('', [Validators.required]),
      fullName: new FormControl<string>('', [Validators.required]),
      post: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      tel: new FormControl<string>('', [Validators.required])
    });
  }
}
