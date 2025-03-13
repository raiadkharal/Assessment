import { Component, inject, OnInit } from '@angular/core';
import { Role } from '../../models/Role';
import { RouterLink } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-role',
  imports: [RouterLink],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  roleList: Role[] = [];

  roleService = inject(RolesService);
  private toastr: ToastrService = inject(ToastrService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // this.loadAllRolesByUser();

    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        // this.loadAllRolesByUser();
      }
    });
  }

  // loadAllRolesByUser() {
  //   debugger;
  //   let loggedInUser: User | null = null;
  //   let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
  //   try {
  //     loggedInUser = JSON.parse(user!);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   if (loggedInUser != null) {
  //     this.roleService.getAllRoles(loggedInUser?.applicationUserId).subscribe(
  //       (response: ApiResponseModel) => {
  //         this.projectList = response.data;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
}
