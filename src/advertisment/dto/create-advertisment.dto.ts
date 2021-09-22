import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdDto {
   @IsNotEmpty()
   @IsString()
   readonly title!: string;

   @IsNotEmpty()
   @IsString()
   readonly description!: string;

   @IsNotEmpty()
   @IsNumber()
   readonly price!: number;

   @IsNotEmpty()
   @IsNumber()
   readonly userId!: number;
}