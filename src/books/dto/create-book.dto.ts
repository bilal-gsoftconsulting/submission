import { IsString, IsNumber  , IsNotEmpty } from 'class-validator';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

}