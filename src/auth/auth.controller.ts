import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { Login } from './decorators/login.decorator';
import { IncomingHttpHeaders } from 'http';
import { ListOfValidRoles } from './interfaces/roles';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // Login    // Implemented date column method on DB allow me to handle user login, saving time they make login
  @Post('sign-in')
  signIn(
    @Body() loginAuthDto: LoginAuthDto,
    // @Headers() headers: IncomingHttpHeaders
    ) {
      // const { authorization } = headers;
      // const token = authorization.split(' ')[1];
    return this.authService.login(loginAuthDto);
  }

  // This is an especial route endpoint what through request from frontend, user can be make-
  // -log in again though other user with same credentials had already been logged in
  @Post('resign-in')
  loginAgain( @Body() loginAuthDto: LoginAuthDto ) {
    return this.authService.loginAgain( loginAuthDto );
  }

  @Post('sign-out')
  @Auth()
  logout(
    @GetUser() user: User
  ) {
    return this.authService.logout( user );
  }


  // revalidate token
  @Get('renew')
  @Auth() 
  revalidateToken(
    @GetUser() user: User
  ) {   
    return this.authService.revalidateToken(user);
  }

  @Patch(':id')
  @Auth()
  update(
    @GetUser() user: User,
    @Param('id') id: string, 
    @Body() updateAuthDto: UpdateAuthDto
  ){
    if ( user.uid !== +id ) throw new BadRequestException('Unauthorized to update other data does not belong you');
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @Auth( ListOfValidRoles.admin, ListOfValidRoles.superUser )
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  

  
}
