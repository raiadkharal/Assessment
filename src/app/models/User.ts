import { Organization } from './Organization';
import { Project } from './Project';
import { ProjectCollaborator } from './ProjectCollaborator';
import { Role } from './Role';

export class User {
  applicationUserId: number;
  name: string;
  email: string;
  roleId: number;
  role?: Role | null;
  // refreshToken: string;
  // refreshTokenExpiryDate: string;
  // passwordHash: string;
  Password: string;
  ConfirmPassword: string;
  phoneNumber: string;
  address: string;
  projects?: Project[] | null;
  organizations?: Organization[] | null;
  projectCollaborators: ProjectCollaborator[] | null;

  constructor() {
    this.applicationUserId = 0;
    this.name = '';
    this.email = '';
    this.roleId = 0;
    this.role = null;
    // this.refreshToken = '';
    // this.refreshTokenExpiryDate = '';
    this.Password = '';
    this.ConfirmPassword = '';
    // this.passwordHash = '';
    this.phoneNumber = '';
    this.address = '';
    this.projects = null;
    this.organizations = null;
    this.projectCollaborators = null;
  }
}
