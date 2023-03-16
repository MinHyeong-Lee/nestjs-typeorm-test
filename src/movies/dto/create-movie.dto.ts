import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString({ each: true })
  genres: string;
}
