import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthFormService } from '@features/auth/services/auth-form.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private authFormService = inject(AuthFormService);

  protected form: FormGroup<any> = new FormGroup<any>({});

  ngOnInit(): void {
    this.form = this.authFormService.createLoginForm();
  }

  submit() {
    if (this.form?.invalid) return;
    this.authService.login(this.form?.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
