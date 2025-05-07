import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenService } from '../../../services/token/token.service';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.authService.authStatus.subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigate(['/login']);
  }
}
