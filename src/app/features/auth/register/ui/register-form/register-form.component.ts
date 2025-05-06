import { Component, effect, inject, input, output } from '@angular/core';
import { RegisterStatus } from '../../data-access/register.service';
import { RegisterCredentials } from '@shared/interfaces';
import { AuthService } from '@shared/data-access/auth.service';
import { AuthFormService } from '@features/auth/services/auth-form.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@shared/ui/ui-formfield-helm/src';
import { HlmInputDirective } from '@shared/ui/ui-input-helm/src';
import { HlmLabelDirective } from '@shared/ui/ui-label-helm/src';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@shared/ui/ui-select-helm/src';
import { HlmButtonDirective } from '@shared/ui/ui-button-helm/src';

@Component({
  selector: 'app-register-form',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    HlmButtonDirective,
  ],
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
