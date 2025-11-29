import {
  IsOptional,
  IsString,
  IsUrl,
  IsAlphanumeric,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  code?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  expiresInDays?: number;
}
