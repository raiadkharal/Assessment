import { ProjectCollaborator } from './ProjectCollaborator';
import { User } from './User';

export class Project {
  projectId: number;
  name: string;
  description: string;
  ownerId: number;
  organizationId: number;
  ownerName: string;
  projectCollaborators: ProjectCollaborator[] | null;

  constructor() {
    this.projectId = 0;
    this.name = '';
    this.description = '';
    this.ownerId = 0;
    this.organizationId = 0;
    this.ownerName = '';
    this.projectCollaborators = null;
  }
}
