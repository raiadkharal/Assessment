import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { OrganizationService } from '../../services/organization.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { TitleCasePipe } from '@angular/common';
import { OrganizationMember } from '../../models/OrganizationMember';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-user-managment',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss',
})
export class UserManagmentComponent implements OnInit {
  membersList: User[] = [];
  organizationId: number | null = null;
  organizationName: string = 'Organization';

  private organizationService = inject(OrganizationService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.organizationId = parseInt(id);
      this.loadAllMembersByOrganization();
    } else {
      let id = localStorage.getItem(Constant.OGRANIZATION_ID);
      if (id != null) {
        this.organizationId = parseInt(id);
        this.loadAllMembersByOrganization();
      }
    }

    this.authService.$refreshTokenReceived.subscribe((isRefreshed: boolean) => {
      if (isRefreshed) {
        this.loadAllMembersByOrganization();
      }
    });
  }

  loadAllMembersByOrganization() {
    this.organizationService
      .getOrganizationById(this.organizationId!)
      .subscribe(
        (response: ApiResponseModel) => {
          this.organizationName = response.data.name;
          this.membersList = response.data.members;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  removeMember(userId: number) {
    let confirmed: boolean = confirm(
      'Are you sure you want to remove this user.'
    );
    if (confirmed) {
      let obj = new OrganizationMember();
      obj.userId = userId;
      if (this.organizationId != null) {
        obj.organizationId = this.organizationId;
      }

      this.organizationService
        .removeMemer(obj)
        .subscribe((res: ApiResponseModel) => {
          if (res.result == true) {
            this.toastr.success('User Removed successfully.');
            this.loadAllMembersByOrganization();
          } else {
            this.toastr.error(res.message);
          }
        });
    }
  }
}
