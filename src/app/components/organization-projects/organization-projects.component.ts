import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { OrganizationService } from '../../services/organization.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Constant } from '../../constant/constant';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-organization-projects',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './organization-projects.component.html',
  styleUrl: './organization-projects.component.scss',
})
export class OrganizationProjectsComponent implements OnInit {
  organizationProjectList: Project[] = [];
  organizationId: number | null = null;
  organizationName: string = 'Organization';

  private organizationService = inject(OrganizationService);
  private authService = inject(AuthService);

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.organizationId = parseInt(id);
      this.loadAllProjectsByOrganization();
    } else {
      let id = localStorage.getItem(Constant.OGRANIZATION_ID);
      if (id != null) {
        this.organizationId = parseInt(id);
        this.loadAllProjectsByOrganization();
      }
    }

    //save orginization id to local storage
    if (id != null) {
      localStorage.setItem(Constant.OGRANIZATION_ID, id);
    }
    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        this.loadAllProjectsByOrganization();
      }
    });
  }

  loadAllProjectsByOrganization() {
    this.organizationService
      .getOrganizationById(this.organizationId!)
      .subscribe(
        (response: ApiResponseModel) => {
          this.organizationName = response.data.name;
          this.organizationProjectList = response.data.projects;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
