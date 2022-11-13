import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { METADATA_ROLES } from '../decorators/roles-hardcode.decorator';
import { ListOfValidRoles } from '../interfaces/roles';
import { User } from '../entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector    // this get the metadata: in this case 
                                            // for  example it will be @Auth('admin' or 'superuser')
  ) {}


  canActivate( context: ExecutionContext ): boolean | Promise<boolean> {

    const validRoles: string[] = this.reflector.get<ListOfValidRoles[]>( METADATA_ROLES, context.getHandler() )

    if ( !validRoles || !validRoles.length ) return true;

    // get user to check if it fulfill with ROLE requirement
    const req = context.switchToHttp().getRequest(); // this was put on JWT Strategy before 
    const user = req.user as User;
    if ( !user ) throw new BadRequestException('User not found');

    for (const role of user.roles) {
      if ( validRoles.includes(role) ) return true;
    }

    throw new ForbiddenException(`User  ${user.lastname} need a valid role that are this --[ ${validRoles} ] `)
  }
}
