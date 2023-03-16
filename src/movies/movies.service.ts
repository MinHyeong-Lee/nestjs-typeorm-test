import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  getAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async getOne(id: number): Promise<Movie> {
    const movie = this.moviesRepository.findOneBy({
      id: id
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async create(movie: CreateMovieDTO) {
    await this.moviesRepository.save(movie);
  }

  async remove(id: number): Promise<Object> {
    console.log(id)
    const deletedMovie = await this.moviesRepository.delete({id: id})
    if(!deletedMovie.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return {deleted: true};
  }

  async update(id: number, updateData: UpdateMovieDTO) {
    const prevMovie = await this.moviesRepository.findOneBy({
      id: id,
    });
    if(prevMovie) {
      let moviesToUpdate = { ...prevMovie, ...updateData };
      await this.moviesRepository.save(moviesToUpdate);
    }
  }
}
