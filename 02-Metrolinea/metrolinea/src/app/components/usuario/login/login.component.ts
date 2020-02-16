import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form): void {
    console.log('login', form.value);
    this.authService.login(form.value).subscribe(res => {
      this.authService.administrador();
      this.router.navigateByUrl('/home');
    });
  }
}
