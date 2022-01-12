import { SetMetadata } from '@nestjs/common';

export const KEY = 'roles'
export const Roles = (...roles: string[]) => SetMetadata(KEY, roles);
