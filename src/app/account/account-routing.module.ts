import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';


const routes: Routes = [
  {
    path: 'accounts/:id',
    component: AccountDetailComponent
  },
  {
    path: 'accounts',
    component: AccountListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
