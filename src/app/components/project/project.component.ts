import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { Constant } from '../../constant/constant';
import { User } from '../../models/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  projectList: Project[] = [];

  projectService = inject(ProjectService);
  private toastr: ToastrService = inject(ToastrService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadAllUserProjects();

    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        this.loadAllUserProjects();
      }
    });
  }

  loadAllUserProjects() {
    debugger;
    let loggedInUser: User | null = null;
    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    try {
      loggedInUser = JSON.parse(user!);
    } catch (e) {
      console.log(e);
    }
    if (loggedInUser != null) {
      this.projectService
        .getProjectsByUserId(loggedInUser?.applicationUserId)
        .subscribe(
          (response: ApiResponseModel) => {
            this.projectList = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
