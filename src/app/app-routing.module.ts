import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from "./components/info-component/info.component";
import { LoadUserComponent } from "./components/load-user-component/load-user.component";
import { UserListComponent } from "./components/user-list-component/user-list.component";

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'loadUser', component: LoadUserComponent },
  { path: 'userList', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
