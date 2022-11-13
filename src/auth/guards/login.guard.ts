import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(
    context: ExecutionContext, ): Promise<any> {

      // const user = await this.userRepository.findOneBy( { email: '' } )
      
      
      
      throw new UnauthorizedException('Other user already is logged in');
    
  }
}
