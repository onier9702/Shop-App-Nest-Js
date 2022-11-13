
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { User } from '../entities/user.entity';
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from '@nestjs/config';

// Remember make this class an injectable to allow use this class wherever
// and add this injectable providers in AuthModule as a provider and an exports
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }


    async validate( payload: JwtPayload ) :Promise<User> {

        const { uid } = payload;

        console.log('User logged in: ', uid);
        

        const user = await this.userRepository.findOneBy( {uid: +uid} );
        if ( !user ) 
            throw new UnauthorizedException('Token not valid');

        if ( !user.isActive ) 
            throw new UnauthorizedException('User is inactive, talk to Admin');


        return user;  // is important this return because this add user to request
        // the preview return make this: req: request => req.user = user;
    }


}