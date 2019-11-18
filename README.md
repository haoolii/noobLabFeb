Readme

# NoobLabFeb

## Usage
```
npm install
```

```
npm start
```

## 路由關鍵字
### router
提供操控路由以及導航功能。
可以訂閱路由事件、取得狀態。
路由錯誤Handler。
改變路由可透過router

### route
ActivatedRoute
包含與當前元件相關的路由資訊，可用來遍歷Router的狀態樹。

## STEP-0
### 初始化

```
ng new noobLabFeb --routing
```

引入style樣式以及assets圖檔。

This is the code for this part of the completion.
> `git checkout -f step-0`

## step-1 basic routes
### 建立基礎路由
> 建立具有路由的基本頁面。

新增四個組件，分別About、Home、Login以及NotFound404。

```
ng g c about
ng g c home
ng g c login
ng g c not-found
```

初始化about html結構。

```
// about.component.html

<div class="hero page">
  <div class="about">
    <h1>Overview</h1>
    <p class="text-align-left">
        Overview
        The browser is a familiar model of application navigation:

        Enter a URL in the address bar and the browser navigates to a corresponding page.
        Click links on the page and the browser navigates to a new page.
        Click the browser's back and forward buttons and the browser navigates backward and forward through the history of pages you've seen.
    </p>
  </div>
</div>

```

初始化home html結構。

```
<div class="hero page">
  <div class="home flex flex-x">
    <h1>Routing & Navigation</h1>
    <p>
      <span class="bold">
        DEVELOP ACROSS ALL PLATFORMS
      </span>
      Learn one way to build applications with Angular and reuse your code.
    </p>
    <div class="buttons">
      <a class="button button-orange">login! Let's route it!</a>
    </div>
  </div>
</div>

```


初始化login html結構。

```
<div class="hero page">
  <div class="login">
    <div class="card">
      <h2>Let's route it !!</h2>
      <div class="h100 flex flex-x p10">
        <input placeholder="Username" type="text" class="w100 m20t">
        <input placeholder="Password" type="text" class="w100 m20t">
        <input type="button" class="button button-orange w100 m20t" value="login">
      </div>
    </div>
  </div>
</div>
```

初始化not-found html結構。
```
<div class="hero page">
  <div class="notFound page">
    <h1>NOT FOUND! 404</h1>
  </div>
</div>
```

並且在設定基本路由。

* 路由的`**`字元不管輸入甚麼都會通過，因此此路徑前如果都沒有符合的，將會到這一路由，並顯示not-found的這一個組件。
* 如果網址並未指定path，那將會對應至''此路徑，因此可以透過`redirectTo`重導向到我們的首頁`home`，`pathMatch:full`意旨必須是整個路經與此path相符合才行，預設是prefix，只要部分相符，將導致每一個路徑都會符合。

```
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

This is the code for this part of the completion.
> `git checkout -f step-1`

## step-2 neste routes
### 建立巢狀路由
> 建立較複雜的巢狀路由。

新增一個register註冊頁面。

```
ng g c register
```

並設定此html

```
register.component.html

<div class="hero page">
  <div class="register">
    <div class="card">
      <h2>Register</h2>
      <div class="h100 flex flex-x p10">
        <input placeholder="Username" type="text" class="w100 m20t">
        <input placeholder="Email" type="text" class="w100 m20t">
        <input placeholder="Password" type="text" class="w100 m20t">
        <input placeholder="Password" type="text" class="w100 m20t">
        <input type="button" class="button button-orange w100 m20t" value="register">
      </div>
    </div>
  </div>
</div>

```

樣式也要新增！
```
src/style.css

/* register */
.register input[type="text"] {
  width: 260px;
  height: 45px;
}

```

新增子路由，我希望login、register都在user這一路徑下，於是使用子路由。
透過children陣列產生一子路由，路徑/user會進入該路由，/user/login、/user/register分別就可以對應不同component。

```
// app-routing.moddule.ts

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'user',
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
    ]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];
```

設定完之後可以輸入網址試試看，是否正常運作。

This is the code for this part of the completion.
> `git checkout -f step-2`

## step-3 module、lazyLoad
### 使用module以及使用lazyload
> 使用路由模組建構更龐大的路由系統，以及透過lazyload優化載入速度。

建立account模組，account模組模擬為內部系統會用到的功能組件的模組，且具備路由。

`--routing`使建構模組時，會一併產生路由設定。

```
ng g m account --routing
```

新增accounts組件，用來列表我們要成列的資料列表。且此組件建立在account模組下。
```
ng g c account/account-list
```

設定account路由
```
// account-routing.module.ts

import { AccountListComponent } from './account-list/account-list.component';


const routes: Routes = [
  {
    path: 'accounts',
    component: AccountListComponent
  }
];

...

```

設定路由至account module。

有一般同步載入和lazyload延遲載入的兩種方式，lazyLoad可以讓初次進入網頁時，不必全部模組一次載入，而是在routing到該頁面時再載入。

同步載入
```
// app-routing.module.ts

import { AccountModule } from './account/account.module';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'user',
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => AccountModule
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

...

```

lazylaod

```
const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'user',
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];
```
以上兩種方法都可行。設定完成後，至/auth/accounts測試是否可正常運作。目前的頁面還沒有美化以及綁定資料，沒有任何東西。

#### LazyLoad 差異示意

以Chrome development Tool來看，Network可顯示載入的資源。同步載入看的出來並未拆分各個module，而是直接一次性地載入。

LazyLoad明顯地將account的module分開載入了，且只有在使用者登錄進入此path才會動態載入。尚未使用到此path的使用者並不會載入此。在不需要此module的狀況下，不必浪費時間等待此module。

#### 同步載入
![](https://i.imgur.com/G0N06k2.png)


#### LazyLoad
![](https://i.imgur.com/e85hmeJ.png)


![](https://i.imgur.com/3t8bdq2.png)

#### 建構account、accounts頁面以及樣式。

創建account型別，用來定義account屬性。
```
src/app/account.ts

export class Account {
  id: number;
  event: string;
  price: number;
  description: string;
  createDate: string;
  updateDate: string;
}
```

創建 Service，用來模擬取得資料，預設三個account，並設定取得account的方法。
```
ng g s account/accounts
```

```
// accounts.service.ts

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

```

建構AccountListComponent架構、樣式。

```
// account-list.component.ts

<div class="accounts page">
  <div class="list">
    <ng-container *ngFor="let account of accounts$ | async">
      <div class="card cursor-pointer card-hover">
          <div class="flex gap-10 flex-space-between">
            <h1 class="event">{{account.event}}</h1>
            <h3 class="price">{{account.price | currency:'NTD'}}</h3>
          </div>
          <p class="date">
            {{account.createDate}}
          </p>
      </div>
    </ng-container>
  </div>
</div>
```

這邊新增了一個reactive的變數，用來儲存從accountsService返回的資料。
```
// account-list.component.ts
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

```

login頁面設定連結，方便測試登入。
```
// login/login.html

<input type="button" class="button button-orange w100 m20t" value="login" [routerLink]="['/auth/accounts']" routerLinkActive="router-link-active" >

```

測試是否正常運作。

This is the code for this part of the completion.
> `git checkout -f step-3`

## step-4 增加路由守衛
> 限制進入auth路徑必須為登入狀態，否則無法進入。

新增認證 Service

```
ng g s auth/auth
```

增加login認證方法，預設有noobUser，帳號密碼傳入相符才會reactive true。
```
// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  noobUser = {
    username: 'noob',
    password: 'noob'
  };

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  login({username, password}: {username: string, password: string}) {
    const isNoob =
      username === this.noobUser.username &&
      password === this.noobUser.password;

    this.isLoggedIn$.next(isNoob);

    return of(isNoob);
  }
}

```

新增路由守衛，CanActivate 即可。
```
ng g guard auth/auth
```

設定路由守衛，之後我們在進入路由前，會呼叫canActivate，並呼叫auth服務來確認該使用者是否可以進到此路由，true為允許，false為禁止，可回傳Observable。

因此我們直接回傳我們auth服務得到的Observable，可能為True或False。
```
// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationCancel } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {});
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoggedIn$;
  }
}
```

接著我們到路由設定，將我們寫好的路由守衛設定在路由上，未來路由進入前，都會經過這路由守衛了！

```
...
import { AuthGuard } from './auth/auth.guard';
...

{
    path: 'auth',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    canActivate: [AuthGuard],
},
...
```

測試`/auth/accounts`看看是否可以進入呢，沒辦法進入為正常。
但正常其況下如果無法進入，應該要導回首頁或登陸頁面，因此繼續改善。

我們在建構子的地方增加一個訂閱，一旦發生NavigationCancel這個錯誤，我們就跳出一個alert彈窗，以及重新導向/home首頁。
```
// auth.guard.ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationCancel } from '@angular/router';

...

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events
        .pipe(
          filter(e => e instanceof NavigationCancel)
        )
        .subscribe(() => {
          alert('You do not have permission !!');
          timer(500).subscribe(v => this.router.navigate(['/home']));
        });
  }
```

修改完成後測試看看是否能順利導向首頁。接著完成登入功能。

新增formsModule，並將login變數雙向繫結上變數。

```
// app.module.ts
...
import { FormsModule } from '@angular/forms';
...
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
],
...
```

登入部分，我們呼叫auth.service驗證登入是否成功，成功就跳轉到`/auth/accounts`，失敗則alert。
任鄭成功後，在auth.service中會將isLoggedIn$此Reactive變數改為True，就可以通過路由守衛。因此可以成功跳轉至`/auth/accounts`，
```
// login.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login({username: this.username, password: this.password})
        .subscribe(v => {
          if (v) {
            this.router.navigate(['/auth/accounts']);
          } else {
            alert('Authorization failed');
          }
        });
  }
}

```

```
// login.component.ts

<div class="hero page">
  <div class="login">
    <div class="card">
      <h2>Login</h2>
      <div class="h100 flex flex-x p10">
        <input placeholder="Username" type="text" class="w100 m20t" [(ngModel)]="username">
        <input placeholder="Password" type="text" class="w100 m20t" [(ngModel)]="password">
        <input type="button" class="button button-orange w100 m20t" value="login" routerLinkActive="router-link-active" (click)="login()" >
      </div>
    </div>
  </div>
</div>

```

測試看看是否可運行。

This is the code for this part of the completion.
> `git checkout -f step-4`

## step-5、step-6 Resolver確保資料載入完成
> 防止資料尚未載入完成就進入路徑。

跳過製作detail頁面繁瑣步驟。
```
git checkout -f step-5
```
detail頁面是點擊account時會載入詳細記帳資料，資料來源是由`accountService`取得。
`accountsService`中刻意做了1000ms的延遲，將會導致載入頁面需要多花一秒，且會有白畫面的狀況。

大概是這樣。
![](https://i.imgur.com/gqBYyQi.png)

這一步驟已經建立了一個 Resolver，是透過以下指令。
```
ng g s detail-resolver
```

增加resolve方法，在路由進入前會先呼叫此方法。並會針對路由的id並呼叫`Service`取得對應的記帳資料。
```
// detail-resolver.service.ts

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

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

```

增加Resolver至路由。

```
// account-routing.module.ts

import { DetailResolverService } from './detail-resolver.service';
...
  {
    path: 'accounts/:id',
    component: AccountDetailComponent,
    resolve: {
      account: DetailResolverService
    }
  },
 ...
 
```

並將`account-detail`內的ngOninit取得資料方法變更為從路由讀取，因為路由已經幫我們預先得到資料了。

```
// account-detail.component

...
  ngOnInit() {
    this.account$ = this.route.data.pipe(
      map(v => v.account)
    );
  }
...

```

修改完成測試看看是否會延遲一陣子才進入detail頁面。

This is the code for this part of the completion.
> `git checkout -f step-6`

## step-7 Preload 預先載入模組
> lazyLoad可以省下載入的時間，但當需要模組時的那一刻卻要等待，preload可以預先載入卻不會影響第一次載入時間。

PreloadAllModules預設是會預載所有lazyLoad的非同步module，但可以克制化屬於自己的預載策略。
```
...
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
...
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
...
```

This is the code for this part of the completion.
> `git checkout -f step-7`

## step-8 美化
> 美化一些部分

* 增加loading屏蔽
* 改善nav顯示
* 登出功能

This is the code for this part of the completion.
`git checkout -f step-8`

