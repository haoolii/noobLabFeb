import { Injectable } from '@angular/core';
import { Account } from '../account';
import { Observable, of, from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  accounts: Array<Account> = [
    {
      id: 0,
      event: 'Buy apple',
      price: 80,
      description: `I buy a lot of apple, hay hay! RxJS v6 has arrived!
                    While this is a major version change (from 5.x to 6.x),
                    we\'ve put in a lot of work to keep the hard breaking changes to a minimum.
                    In most cases, this allows application and library developers to update incrementally and
                    use RxJS v6 without any modifications to their code.`,
      createDate: '2019-12-10',
      updateDate: '2019-11-12'
    },
    {
      id: 1,
      event: 'Buy breakfast',
      price: 50,
      description: `I buy a lot of apple, hay hay! RxJS v6 has arrived!
                    While this is a major version change (from 5.x to 6.x),
                    we\'ve put in a lot of work to keep the hard breaking changes to a minimum.
                    In most cases, this allows application and library developers to update incrementally and
                    use RxJS v6 without any modifications to their code.`,
      createDate: '2019-12-10',
      updateDate: '2019-11-12'
    },
    {
      id: 2,
      event: 'MRT TICKET',
      price: 25,
      description: `I buy a lot of apple, hay hay! RxJS v6 has arrived!
                    While this is a major version change (from 5.x to 6.x),
                    we\'ve put in a lot of work to keep the hard breaking changes to a minimum.
                    In most cases, this allows application and library developers to update incrementally and
                    use RxJS v6 without any modifications to their code.`,
      createDate: '2019-12-10',
      updateDate: '2019-11-12'
    }
  ];

  getAccounts(): Observable<Account[]> {
    return of(this.accounts.sort((a, b) => b.id - a.id));
  }

  getAccount(id): Observable<Account> {
    return from(this.accounts).pipe(
      filter(account => account.id === id)
    );
  }

  createAccount(account: Account): Observable<Account> {
    this.accounts.push(account);
    return of(account);
  }

  getLength(): number {
    return this.accounts.length;
  }
}
