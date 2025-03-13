import { User } from './User';

export class Organization {
  organizationId: number;
  name: string;
  description: string;
  ownerId: number;
  members: User[] | null;

  constructor() {
    this.organizationId = 0;
    this.name = '';
    this.description = '';
    this.ownerId = 0;
    this.members = null;
  }
}
