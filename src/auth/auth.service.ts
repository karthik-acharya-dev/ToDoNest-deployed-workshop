import { BadGatewayException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtService: JwtService
  ){}

  async login(loginData: loginDto){
    const {email, password} = loginData;
    const user = await this.dataservice.user.findFirst({
      where: {
        email: email
      }
    })
    if(!user){
      throw new BadGatewayException("User not found");
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if(!validatePassword){
      throw new BadGatewayException("Invalid password");
    }
    return{
      token: this.jwtService.sign({email})
    }
  }

  async register(registerData: RegisterUserDto) {

    const user = await this.dataservice.user.findFirst({
      where: {
        email: registerData.email
      }
    })
    if(user) {
      return new BadGatewayException("User with this email already exists");
    }

    registerData.password = await bcrypt.hash(registerData.password, 10);
    return await this.dataservice.user.create({
      data: registerData
    })

  }
}