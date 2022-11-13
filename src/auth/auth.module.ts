import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProductModule } from '../product/product.module';
import { User } from './entities/user.entity';
// import { Login } from './entities/login.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  
  imports: [
    ConfigModule, // Not forgett to import this module
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {

        const jwtSecret = configService.get('JWT_SECRET');
        if ( !jwtSecret ) throw new Error('Environment JWT variable is missing');

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: '4h'
          }
        }
      }
    }),

    TypeOrmModule.forFeature([ User ]),
    ProductModule,
  ],
  exports: [
    PassportModule,
    JwtModule,
    TypeOrmModule,
    JwtStrategy
  ]
})
export class AuthModule {}
