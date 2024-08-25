import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiOperation({ description:'To register a new user with email.', summary: 'Register a User with details.' })
  register(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }
  
  @Post('login')
  @ApiOperation({ description:'Login with email.', summary: 'Endpoint to login with user email and password.' })
  login(@Body() loginData: loginDto){
    return this.authService.login(loginData);
  }
}