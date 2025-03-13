import { Component, inject } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Constant } from '../../constant/constant';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProjectCollaborator } from '../../models/ProjectCollaborator';

@Component({
  selector: 'app-shared-project',
  imports: [RouterLink],
  templateUrl: './shared-project.component.html',
  styleUrl: './shared-project.component.scss',
})
export class SharedProjectComponent {
  projectCollaborators: ProjectCollaborator[] = [];

  private projectService = inject(ProjectService);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadAllProjects();

    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        this.loadAllProjects();
      }
    });
  }

  loadAllProjects() {
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
          this.projectCollaborators = response.data.projectCollaborators;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
