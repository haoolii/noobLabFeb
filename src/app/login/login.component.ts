import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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
            // timer(500).subscribe(() => this.router.navigate(['/auth/accounts']));
            this.router.navigate(['/auth/accounts']);
          } else {
            alert('Authorization failed');
          }
        });
  }
}
