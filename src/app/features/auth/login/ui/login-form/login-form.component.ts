import { Component, inject, input, output } from '@angular/core';
import { LoginStatus } from '../../data-access/login.service';
import { Credentials } from '@shared/interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '@features/auth/services/auth-form.service';
import { HlmButtonDirective } from '@shared/ui/ui-button-helm/src';
import { HlmInputDirective } from '@shared/ui/ui-input-helm/src';
import { HlmLabelDirective } from '@shared/ui/ui-label-helm/src';
import { HlmFormFieldModule } from '@shared/ui/ui-formfield-helm/src';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginStatus = input.required<LoginStatus>();
  login = output<Credentials>();

  private authFormService = inject(AuthFormService);

  loginForm = this.authFormService.createLoginForm();
}
