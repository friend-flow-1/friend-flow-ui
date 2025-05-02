import { Component, inject, input, output } from '@angular/core';
import { LoginStatus } from '../../data-access/login.service';
import { Credentials } from '@shared/interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '@features/auth/services/auth-form.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginStatus = input.required<LoginStatus>();
  login = output<Credentials>();

  private authFormService = inject(AuthFormService);

  loginForm = this.authFormService.createLoginForm();
}
