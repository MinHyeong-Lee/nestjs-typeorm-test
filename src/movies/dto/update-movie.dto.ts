import { PartialType } from '@nestjs/mapped-types';
import { fromEventPattern } from 'rxjs';
import { CreateMovieDTO } from './create-movie.dto';
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
