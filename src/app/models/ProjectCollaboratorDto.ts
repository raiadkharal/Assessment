export class ProjectCollaboratorDto {
  projectId: number;
  collaboratorId: number;

  constructor() {
    this.projectId = 0;
    this.collaboratorId = 0;
  }
}
