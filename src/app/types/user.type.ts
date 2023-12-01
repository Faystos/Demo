export interface IHttpResponseUserList {
  users: IUser[];

}
export interface IUser {
  id: string;
  dateRegistration: Date | string;
  fullName: string;
  post: string;
  email: string;
  password: string;
  tel: string;
}
