import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  userObj: User = new User();
  roleList: Role[] = [];
  selectedRole: number | null = null;

  private toastr: ToastrService = inject(ToastrService);
  private authService = inject(AuthService);
  private roleService = inject(RolesService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.loadAllCompanies();
  }

  loadAllCompanies() {
    this.roleService.getAllRoles().subscribe(
      (res: ApiResponseModel) => {
        this.roleList = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser() {
    debugger;
    this.userObj.roleId = 1; //by default role should be member (roleId 1 for member)
    this.authService.register(this.userObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result == true) {
          this.toastr.success('User created Successfully');
          this.router.navigateByUrl('login', { replaceUrl: true });
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
