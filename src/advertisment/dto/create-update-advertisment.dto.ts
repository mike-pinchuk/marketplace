import {} from 'class-validator';

export class CreateUpdateAdDto {
   readonly title!: string;

   readonly description!: string;

   readonly price!: number;

   readonly userId!: number;
}