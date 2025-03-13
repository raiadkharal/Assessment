import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { MyOrganizationComponent } from './components/my-organization/my-organization.component';
import { RoleComponent } from './components/role/role.component';
import { SharedProjectComponent } from './components/shared-project/shared-project.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { OrganizationLayoutComponent } from './components/organization-layout/organization-layout.component';
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';
import { OrganizationProjectsComponent } from './components/organization-projects/organization-projects.component';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { Constant } from './constant/constant';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'my-projects',
        component: ProjectComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'project-detail',
        component: ProjectDetailComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'my-organization',
        component: MyOrganizationComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'create-organization',
        component: CreateOrganizationComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'role-managment',
        component: RoleComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'shared-projects',
        component: SharedProjectComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
    ],
  },
  {
    path: '',
    component: OrganizationLayoutComponent,
    children: [
      {
        path: 'organization-projects',
        component: OrganizationProjectsComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
      {
        path: 'user-managment',
        component: UserManagmentComponent,
        canActivate: [authGuard],
        data: {
          roles: [
            Constant.ROLE_MEMBER,
            Constant.ROLE_ADMIN,
            Constant.ROLE_OWNER,
          ],
        },
      },
    ],
  },
];
