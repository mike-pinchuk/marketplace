import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {Role} from '../../user/user.entity';

export class CreateAuthUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email!: string;

    @IsNotEmpty()
    @IsString()
    readonly password!: string;

    @IsNotEmpty()
    @IsString()
    readonly phoneNumber!: string;

    @IsNotEmpty()
    @IsString()
    readonly role!: Role;
}