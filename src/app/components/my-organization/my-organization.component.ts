import { Component, inject, OnInit } from '@angular/core';
import { Organization } from '../../models/Organization';
import { OrganizationService } from '../../services/organization.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Constant } from '../../constant/constant';
import { UserService } from '../../services/user.service';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organization',
  imports: [RouterLink],
  templateUrl: './my-organization.component.html',
  styleUrl: './my-organization.component.scss',
})
export class MyOrganizationComponent implements OnInit {
  organizationList: Organization[] = [];

  organizationService = inject(OrganizationService);
  private userService = inject(UserService);
  private toastr: ToastrService = inject(ToastrService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadUserOrganizations();

    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        this.loadUserOrganizations();
      }
    });
  }

  loadUserOrganizations() {
    debugger;
    let loggedInUser: User | null = null;
    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    try {
      loggedInUser = JSON.parse(user!);
    } catch (e) {
      console.log(e);
    }
    if (loggedInUser != null) {
      this.userService.getUserById(loggedInUser?.applicationUserId).subscribe(
        (response: ApiResponseModel) => {
          this.organizationList = response.data.organizations;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
