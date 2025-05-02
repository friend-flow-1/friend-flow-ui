import { Component, effect, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './ui/register-form/register-form.component';
import { RegisterService } from './data-access/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  providers: [RegisterService],
  imports: [ReactiveFormsModule, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerService = inject(RegisterService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.registerService.status() === 'success') {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
