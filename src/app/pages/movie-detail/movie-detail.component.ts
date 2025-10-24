import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public movieService: MovieService, // Make it public so template can access it
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(parseInt(movieId));
    }
  }

  loadMovieDetails(id: number): void {
    this.loading = true;
    this.movieService.getMovieById(id).subscribe({
      next: (movie: Movie) => { // Add type annotation
        this.movie = movie;
        this.loading = false;
      },
      error: (error: any) => { // Add type annotation
        this.error = 'Failed to load movie details';
        this.loading = false;
        console.error('Error loading movie details:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getRatingColor(rating: number): string {
    if (rating >= 8) return 'success';
    if (rating >= 6) return 'warning';
    return 'danger';
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}