import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Account } from '../account';
import { AccountsService } from './accounts.service';
@Injectable({
  providedIn: 'root'
})
export class DetailResolverService implements Resolve<Account> {

  constructor(private accountsService: AccountsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.accountsService.getAccount(id);
  }
}
