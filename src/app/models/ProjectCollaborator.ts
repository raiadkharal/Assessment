import { CollaboratorRole } from './CollaboratorRole';
import { Project } from './Project';
import { User } from './User';

export class ProjectCollaborator {
  id: number;
  projectId: number;
  userId: number;
  roleId: number;

  project: Project | null;
  user: User | null;
  role: CollaboratorRole | null;

  constructor() {
    this.id = 0;
    this.projectId = 0;
    this.userId = 0;
    this.roleId = 0;
    this.project = null;
    this.user = null;
    this.role = null;
  }
}
