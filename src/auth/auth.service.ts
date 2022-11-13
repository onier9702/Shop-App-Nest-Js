import { BadRequestException, Get, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  public async create( createAuthDto: CreateAuthDto ) {
    const { password, ...restProduct } = createAuthDto;
    const now = new Date;
    const newUser = this.userRepository.create({
      ...restProduct,
      date: new Date(now),
      password: bcrypt.hashSync( password, 10 )
    })

    try {

      const { password: pass, uid, ...restUser } = await this.userRepository.save(newUser)
      
      return {
        ...restUser,
        uid,
        token: this.generateJWT( {uid: uid.toString()} )
      };
      
    } catch (error) {
      this.handlerErrorsOnDB(error);
    }
  }

  public async login( loginAuthDto: LoginAuthDto ) {
    
    const userByEmail = await this.checkLogin( loginAuthDto );
    // Verify if one user is already connected
    const duplicated = await this.verifyDuplicateLogIn(userByEmail);
    if ( !duplicated ) throw new UnauthorizedException(`User ${userByEmail.name} already is logged in`);
  
    const { password: pass,isActive, uid, date,  ...restUser } = userByEmail;
    return {
      ...restUser,
      uid,
      token: this.generateJWT( {uid: uid.toString() } )
    };

  }

  async checkLogin( loginAuthDto: LoginAuthDto ): Promise<User> {
    const { email, password } = loginAuthDto;
    const user = await this.userRepository.findOneBy( { email } );
    if ( !user ) throw new BadRequestException(`User with those credentials does not exist --email--`);
    const isValidPass = bcrypt.compareSync( password, user.password );
    if ( !isValidPass ) throw new BadRequestException(`User with those credentials does not exist --password--`);
    return user;
  }

  // User want to login from other user after being rejected
  // this resolve the unexpected close of window browser problem
  public async loginAgain(loginAuthDto: LoginAuthDto) {
    const user = await this.checkLogin( loginAuthDto );
    return await this.revalidateToken( user );
  }

  public async logout( user: User ): Promise<boolean> {

    try {
      
      const userUpdated = await this.userRepository.preload({
        ...user,
        date: null
      });
      await this.userRepository.save(userUpdated);
      return true;

    } catch (error) {
      this.handlerErrorsOnDB(error);
    }

  }

  // Update User
  public async update(id: number, updateAuthDto: UpdateAuthDto) {
    // const { id } = updateAuthDto;
    const userOnDB = await this.findOne( id );
    const user = await this.userRepository.preload({
      ...userOnDB,
      ...updateAuthDto
    });

    const { password, date, isActive, ...restUpdated } = await this.userRepository.save( user ); 
    return { ...restUpdated };
  }

  // find One User
  public async findOne(id: number) {
    const userOnDB = await this.userRepository.findOneBy( { uid: id } );
    if ( !userOnDB ) throw new BadRequestException(`User with ID: ${id} does not exist`);
    return userOnDB;
  }

  // revalidate token
  public async revalidateToken(  user: User ) {

    await this.setNewDateOnDB(user); 
    const { password, isActive, date, ...restUser } = user;
    return {
      ...restUser,
      token: this.generateJWT( {uid: user.uid.toString()} )
    }
  }

  // Just Admin can do this
  async remove(id: number) {
    const user = await this.findOne(id);
    // await this.userRepository.remove(user);
    await this.userRepository.update( { uid: user.uid }, { isActive: false } );
    // is a good practice remove an user but not delete it from DB, I mean put inactive the user
    return `User ${user.name} ${user.lastname} removed`;
  }


  findAll() {
    return `This action returns all auth`;
  }

  

  // ------------- HELPERS or helpers Methods ----------------------
  private generateJWT( payload: JwtPayload ) {
    return this.jwtService.sign( payload );
  }

  private handlerErrorsOnDB( err: any ) {
    const { errno, sqlMessage } = err;
    if ( errno === 1062 ) {
      throw new BadRequestException(sqlMessage);
    }
    console.log(err);
    throw new InternalServerErrorException('Please check server logs');

  }

  private async verifyDuplicateLogIn( user: User ) {
        
    if ( user.date === null ) {   // maybe user is log out so date is null 
      return this.setNewDateOnDB(user);
    };
    const dateFromDB = new Date(user.date);
    const isValid = this.substractDate(dateFromDB);
    if ( !isValid ) {
      return false;
    } else return await this.setNewDateOnDB(user)
                        
  }

  private async setNewDateOnDB( user: User ) {
    //  update date on DB and make a normal login
    try {
      const now = new Date;
      const userUpdate = await this.userRepository.preload({
        ...user,
        date: new Date(now),
      });
      await this.userRepository.save(userUpdate);
      return true;

    } catch (error) {
      this.handlerErrorsOnDB(error);
    }
  }

  private substractDate( dateFromDB: any ): boolean {
    const now = new Date;
    let a = new Date( now ).toLocaleString();
    let b = dateFromDB.toLocaleString();

    // console.log('Before From DB: ', b );
    // console.log('Date Now: ', a);

    const first = a.split(', ');
    const second = b.split(', ');
    
    // If one is PM and other AM
    if ( first[1].split(' ')[1] !== second[1].split(' ')[1] ) {
      console.log('PM AM');
      return true;
    }

    const day1 = first[0].split('/')[1];
    const day2 = second[0].split('/')[1];

    // if days are different
    if ( day1 !== day2 ) {
      console.log('Days different');
      return true;
    }

    // If hours is less than 4hours
    const hour1 = first[1].split(' ')[0].split(':')[0];
    const hour2 = second[1].split(' ')[0].split(':')[0];
    const diff = (Number(hour1) - Number(hour2))
    if ( diff >= 4 ) {
      console.log('More than 4h of difference');
      return true;
    }
    
    return false;

  }
  
}
