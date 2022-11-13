import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [

    ConfigModule.forRoot(), // this permit or allow to can use environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false

    }),

    // to serve static content in public folder
    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '..', 'public' )
    }),
    
    ProductModule,
    CommonModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
