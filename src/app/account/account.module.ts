import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';


@NgModule({
  declarations: [AccountListComponent, AccountDetailComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
