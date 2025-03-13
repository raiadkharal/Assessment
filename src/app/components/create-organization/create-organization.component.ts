import { Component, inject } from '@angular/core';
import { Organization } from '../../models/Organization';
import { OrganizationService } from '../../services/organization.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponseModel } from '../../models/ApiResponseModel';
import { User } from '../../models/User';
import { Constant } from '../../constant/constant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-organization',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.scss',
})
export class CreateOrganizationComponent {
  organizationObj: Organization = new Organization();
  organizationId: number | null = null;

  organizationService: OrganizationService = inject(OrganizationService);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  createOrganization() {
    debugger;
    let loggedInUser: User | null = null;
    let user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
    try {
      loggedInUser = JSON.parse(user!);
    } catch (e) {
      console.log(e);
    }
    if (loggedInUser != null) {
      this.organizationObj.ownerId = loggedInUser.applicationUserId;
    }
    this.organizationService
      .createOrganization(this.organizationObj)
      .subscribe(() => {
        this.toastr.success('Organization Created Successfully');
        this.router.navigateByUrl('my-organization', { replaceUrl: true });
      });
  }
}
