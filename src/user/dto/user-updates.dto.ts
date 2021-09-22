import { IsEmail, IsString } from "class-validator";

export class UserUpdatesDto {
    @IsString()
    readonly name?: string;

    @IsString()
    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly password?: string;

    @IsString()
    readonly phoneNumber?: string;
}