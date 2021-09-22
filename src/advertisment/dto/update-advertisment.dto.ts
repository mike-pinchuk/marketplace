import { IsNumber, IsString } from 'class-validator';

export class UpdateAdDto {
    @IsString()
    readonly title?: string;

    @IsString()
    readonly description?: string;

    @IsNumber()
    readonly price?: number;
}