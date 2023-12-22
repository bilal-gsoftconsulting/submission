import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsString()
  readonly genre?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
