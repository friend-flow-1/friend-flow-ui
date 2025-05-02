import { Component, effect, inject, input, output } from '@angular/core';
import { RegisterStatus } from '../../data-access/register.service';
import { RegisterCredentials } from '@shared/interfaces';
import { AuthService } from '@shared/data-access/auth.service';
import { AuthFormService } from '@features/auth/services/auth-form.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  status = input.required<RegisterStatus>();
  register = output<RegisterCredentials>();

  private authService = inject(AuthService);
  private authFormService = inject(AuthFormService);
  private router = inject(Router);

  registerForm = this.authFormService.createRegisterForm();

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...credentials } =
        this.registerForm.getRawValue();
      this.register.emit(credentials);
    }
  }
}
