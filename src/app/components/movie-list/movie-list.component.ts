import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() loading: boolean = false;
  @Input() error: string = '';

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}