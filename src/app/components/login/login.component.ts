import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/LoginModel';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { Constant } from '../../constant/constant';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();

  private toastr: ToastrService = inject(ToastrService);
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  ngOnInit(): void {}

  loginUser() {
    debugger;
    this.authService.login(this.loginModel).subscribe(
      (res: ApiResponseModel) => {
        if (res.result == true) {
          localStorage.setItem(Constant.ACCESS_TOKEN_KEY, res.data.accessToken);
          localStorage.setItem(
            Constant.REFRESH_TOKEN_KEY,
            res.data.refreshToken
          );
          localStorage.setItem(
            Constant.LOGGED_IN_USER_KEY,
            JSON.stringify(res.data.user)
          );
          this.toastr.success('Logged in successfully');
          this.router.navigateByUrl('my-projects', { replaceUrl: true });
          this.authService.$userLoggedIn.next(true);
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.error('Invalid Credentials');
        }
        console.log(error);
      }
    );

    // if(this.userObj.Email=='testemail@gmail.com'&&this.userObj.Password=='test123'){
    //   localStorage.setItem('loggedInUser',JSON.stringify(this.userObj))
    //   this.toastr.success("Logged in successfully");
    //   this.router.navigateByUrl('products');
    // }else{
    //   this.toastr.error("Invalid Credentials");
    // }
  }
}
