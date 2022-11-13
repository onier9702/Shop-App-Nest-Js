import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards/role.guard';
import { ListOfValidRoles } from '../interfaces/roles';
import { PutRolesInHardCode } from './roles-hardcode.decorator';

export function Auth (...roles: ListOfValidRoles[]) {
    
    return applyDecorators(
        PutRolesInHardCode(...roles),
        UseGuards( AuthGuard(), RoleGuard ),

        // add all you have in decorators authentication
    )

};
