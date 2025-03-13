import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { Constant } from '../../constant/constant';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { Organization } from '../../models/Organization';
import { OrganizationService } from '../../services/organization.service';
@Component({
  selector: 'app-create-project',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  projectObj: Project = new Project();
  projectId: number | null = null;
  organizationList: Organization[] = [];
  selectedOrganizationId: number | null = null;

  redirectUrl: string = '/my-projects';

  projectService: ProjectService = inject(ProjectService);
  organizationService: OrganizationService = inject(OrganizationService);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('organizationId');
    if (id != null) {
      this.selectedOrganizationId = parseInt(id);
      this.redirectUrl = '/organization-projects';
    } else {
      this.loadAllOrganizations();
    }
  }

  loadAllOrganizations() {
    this.organizationService
      .getAllOrganizations()
      .subscribe((res: ApiResponseModel) => {
        this.organizationList = res.data;
      });
  }
  createProject() {
    debugger;
    let loggedInUser: User | null = null;
    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    try {
      loggedInUser = JSON.parse(user!);
    } catch (e) {
      console.log(e);
    }
    if (loggedInUser != null) {
      this.projectObj.ownerId = loggedInUser.applicationUserId;
      this.projectObj.ownerName = loggedInUser.name;
    }
    if (this.selectedOrganizationId != null) {
      this.projectObj.organizationId = this.selectedOrganizationId;
    }
    this.projectService.createProject(this.projectObj).subscribe(() => {
      this.toastr.success('Project Created Successfully');
      this.router.navigateByUrl(this.redirectUrl, { replaceUrl: true });
    });
  }
}
