import { Permission } from './Permission';
import { User } from './User';

export interface Role {
  roleId: number;
  name: string;
  users: User[];
}
