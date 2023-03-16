// import { Controller, Get, Query, Body, Delete, Patch, Post, Param } from '@nestjs/common';
import {
    Controller,
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
  } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity'
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService){}

    @Get()
    getAll(): Promise<Movie[]> {
        return this.moviesService.getAll()
    }

    @Get("search")
    search(@Query('year') searchingYear:string) {
        return `We are searching for a movie made after: ${searchingYear}`
    }

    @Get(":id")
    getOne(@Param('id') id:number): Promise<Movie> {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movie:CreateMovieDTO) {
        return this.moviesService.create(movie);
    }

    @Delete(':id')
    remove(@Param('id') id:number) {
        return this.moviesService.remove(id);
    }

    @Patch(':id')
    patch(@Param('id') id:number, @Body() updateData:UpdateMovieDTO) {
        return this.moviesService.update(id, updateData);
    }
}
