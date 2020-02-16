import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form): void {
    form.value.estado = false;
    this.authService.register(form.value).subscribe(res => {
      // this.router.navigateByUrl('/');
      console.log('Registrado', form.value);
    });
  }

}
