import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MovieService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class AppModule {}
