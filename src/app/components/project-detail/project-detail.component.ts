import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { User } from '../../models/User';
import { ToastrService } from 'ngx-toastr';
import { ProjectCollaborator } from '../../models/ProjectCollaborator';
import { Organization } from '../../models/Organization';
import { OrganizationService } from '../../services/organization.service';
import { ProjectCollaboratorDto } from '../../models/ProjectCollaboratorDto';
import { Constant } from '../../constant/constant';
import { Permission } from '../../models/Permission';

@Component({
  selector: 'app-project-detail',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  projectObj: Project = new Project();
  collaboratorsList: ProjectCollaborator[] = [];
  projectId: number | null = null;
  organizationList: Organization[] = [];
  selectedOrganizationId: number | null = null;
  loggedInUser: User | null = null;
  collaborator: ProjectCollaborator | null = null;

  redirectUrl: string = '/my-projects';

  private projectService = inject(ProjectService);
  private organizationService = inject(OrganizationService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //get loggedin user from local storage
    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    if (user != null) {
      this.loggedInUser = JSON.parse(user);
    }

    let _organizationId = this.route.snapshot.paramMap.get('organizationId');
    if (_organizationId != null) {
      this.selectedOrganizationId = parseInt(_organizationId);
      this.redirectUrl = '/organization-projects';
    } else {
      this.loadAllOrganizations();
    }

    let _projectId = this.route.snapshot.paramMap.get('id');
    if (_projectId != null) {
      this.projectId = parseInt(_projectId);
      this.loadProject(this.projectId);
    }
  }

  loadAllOrganizations() {
    this.organizationService
      .getAllOrganizations()
      .subscribe((res: ApiResponseModel) => {
        this.organizationList = res.data;
      });
  }

  loadProject(id: number) {
    debugger;
    this.projectService
      .getProjectById(id)
      .subscribe((res: ApiResponseModel) => {
        this.projectObj = res.data;
        this.selectedOrganizationId = this.projectObj.organizationId;
        if (this.projectObj.projectCollaborators != null) {
          this.collaboratorsList = this.projectObj.projectCollaborators;
          this.collaborator = this.getCollaboratorById(this.collaboratorsList);
          console.log(this.collaborator);
        }
      });
  }

  deleteProject() {
    let confirmed: boolean = confirm('Are you sure you want to delete!');
    if (confirmed) {
      if (this.projectId != null) {
        this.projectService
          .deleteProjectById(this.projectId)
          .subscribe((res: ApiResponseModel) => {
            this.toastr.success('Project Deleted Successfully.');
            this.router.navigateByUrl(this.redirectUrl, { replaceUrl: true });
          });
      } else {
        this.toastr.error(
          'Something went wrong. Please refresh page and try again'
        );
      }
    }
  }

  updateProduct() {
    debugger;
    if (this.projectId != null) {
      this.projectService
        .updateProject(this.projectId, this.projectObj)
        .subscribe((res: ApiResponseModel) => {
          this.toastr.success('Project Updated Successfully.');
          this.router.navigateByUrl(this.redirectUrl, { replaceUrl: true });
        });
    } else {
      this.toastr.error(
        'Something went wrong. Please refresh page and try again'
      );
    }
  }
  inviteUser() {}

  removeCollaborator(id: number) {
    if (this.projectId != null) {
      let confirmed: boolean = confirm('Are you sure you want to delete!');
      if (confirmed) {
        let projectCollaboratorObj = new ProjectCollaboratorDto();
        projectCollaboratorObj.collaboratorId = id;
        projectCollaboratorObj.projectId = this.projectId;
        this.projectService
          .removeProjectCollaborator(projectCollaboratorObj)
          .subscribe((res: ApiResponseModel) => {
            if (res.result == true) {
              this.toastr.success('Collaborator removed Successfully.');
              this.loadProject(this.projectId!);
            }
          });
      }
    }
  }

  getCollaboratorById(
    collaboratorsList: ProjectCollaborator[]
  ): ProjectCollaborator | null {
    try {
      return collaboratorsList.find(
        (x) => x.userId === this.loggedInUser?.applicationUserId
      ) as ProjectCollaborator;
    } catch (e) {
      return null;
    }
  }

  hasUpdatePermission(): boolean {
    try {
      let permission: Permission =
        this.collaborator?.role?.projectPermissions.find(
          (x) => x.name === Constant.PERMISSION_UPDATE
        ) as Permission;
      if (permission != null && permission != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  hasDeletePermission(): boolean {
    try {
      let permission: Permission =
        this.collaborator?.role?.projectPermissions.find(
          (x) => x.name === Constant.PERMISSION_DELETE
        ) as Permission;
      if (permission != null && permission != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  hasOwnerRole(): boolean {
    return (
      this.collaborator?.role?.name.toLocaleLowerCase() == Constant.ROLE_OWNER
    );
  }

  actionNotAllowed() {
    alert("You don't have permission to perform this action.");
  }
}
