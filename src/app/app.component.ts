import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@shared/data-access/auth.service';
import { MeService } from '@shared/data-access/me.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService = inject(AuthService);
  meService = inject(MeService);

  constructor() {
    this.authService.restoreSession();

    setTimeout(() => {
      console.log(this.meService.info());
    }, 2000);
  }
}
