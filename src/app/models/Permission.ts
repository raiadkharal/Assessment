import { Role } from './Role';

export interface Permission {
  permissionId: number;
  name: string;
  roles: Role[];
}
