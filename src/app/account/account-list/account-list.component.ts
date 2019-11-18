import { Component, OnInit } from '@angular/core';
import { Account } from '../../account';
import { Observable } from 'rxjs';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts$: Observable<Account[]>;
  constructor(public accountsService: AccountsService) { }

  ngOnInit() {
    this.accounts$ = this.accountsService.getAccounts();
  }

}
