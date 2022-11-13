import { SetMetadata } from '@nestjs/common';
import { ListOfValidRoles } from '../interfaces/roles';

export const METADATA_ROLES = 'roles';

export const PutRolesInHardCode = (...args: ListOfValidRoles[]) => {


    return SetMetadata( METADATA_ROLES, args );
};
