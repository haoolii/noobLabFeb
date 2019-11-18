import { Component, OnInit } from '@angular/core';
import { Account } from '../../account';
import { Observable } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account$: Observable<Account>;
  constructor(
    private accountService: AccountsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.account$ = this.route.paramMap.pipe(
      switchMap(params => this.accountService.getAccount(+params.get('id')))
    );
  }

  back() {
    this.location.back();
  }
}
