import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isString, Length } from "class-validator";



export class loginDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}