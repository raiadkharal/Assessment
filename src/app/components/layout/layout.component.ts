import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Constant } from '../../constant/constant';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  loggedInUser: User | null = null;
  private authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    this.authService.$userLoggedIn.subscribe((isLoggedIn: boolean) => {
      debugger;
      if (isLoggedIn) {
      }
    });

    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    if (user != null) {
      try {
        this.loggedInUser = JSON.parse(user);
        console.log(this.loggedInUser?.email);
      } catch (e) {
        console.log(e);
      }
    }
  }

  logout() {
    localStorage.removeItem(Constant.LOGGED_IN_USER_KEY);
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
}
