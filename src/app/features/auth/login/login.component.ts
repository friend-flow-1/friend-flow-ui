import { Component, effect, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './ui/login-form/login-form.component';
import { LoginService } from './data-access/login.service';
import { AuthService } from '@shared/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  imports: [ReactiveFormsModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginService = inject(LoginService);
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
