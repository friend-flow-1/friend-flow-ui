import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthFormService } from '@features/auth/services/auth-form.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private authFormService = inject(AuthFormService);

  protected form: FormGroup<any> = new FormGroup<any>({});

  ngOnInit(): void {
    this.form = this.authFormService.createRegisterForm();
  }

  submit() {
    if (this.form?.invalid) return;
    this.authService.register(this.form?.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
