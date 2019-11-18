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
