import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateAuthDto {

    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(8)
    mobile: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    address?: string;

}
