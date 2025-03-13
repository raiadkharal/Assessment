import { Permission } from './Permission';

export class CollaboratorRole {
  collaboratorRoleId: number;
  name: string;
  projectPermissions: Permission[];

  constructor() {
    this.collaboratorRoleId = 0;
    this.name = '';
    this.projectPermissions = [];
  }
}
