import { applyDecorators, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { ListOfValidRoles } from '../interfaces/roles';

export function Login (...roles: ListOfValidRoles[]) {

    return applyDecorators(
        UseGuards( LoginGuard ),
        // add all you have in decorators authentication
    )

};
