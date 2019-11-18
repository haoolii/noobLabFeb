import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Account } from '../account';
@Injectable({
  providedIn: 'root'
})
export class DetailResolverService {

  constructor() { }
}
