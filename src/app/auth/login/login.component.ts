import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

// set our navigation object
  // that passes on our global query params and fragment
const navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve',
    preserveFragment: true,
  };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }
  message: string;
  getMessage(): string{
    return 'Logged' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login(): void{
    this.message = 'Trying to log in......';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn){
        // usually you would use the redirect url from the authservice
        // however, to keep the example simple simple we will always redirect to /admin

        const redirectUrl = '/admin';

        // redirect the user
        this.router.navigate([redirectUrl], navigationExtras);

      }
    });
  }

  logout(): void{
    this.authService.logout();
    this.message = this.getMessage();
  }

  ngOnInit(): void {
  }

}
