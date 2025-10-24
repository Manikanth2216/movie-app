import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return 'success';
    if (rating >= 6) return 'warning';
    return 'danger';
  }

  viewDetails(): void {
    this.router.navigate(['/movie', this.movie.id]);
  }
}