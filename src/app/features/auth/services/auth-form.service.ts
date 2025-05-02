import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { passwordMatchesValidator } from '@shared/validators/password-matches.validator';

@Injectable({ providedIn: 'root' })
export class AuthFormService {
  constructor(private fb: FormBuilder) {}

  createLoginForm(): FormGroup {
    return this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createRegisterForm(): FormGroup {
    return this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        gender: ['male', Validators.required],
      },
      {
        updateOn: 'blur',
        validators: [passwordMatchesValidator],
      }
    );
  }
}
