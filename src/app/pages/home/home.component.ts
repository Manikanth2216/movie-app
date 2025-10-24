import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { FilterCriteria } from '../../components/filter-panel/filter-panel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  loading: boolean = false;
  error: string = '';
  
  searchQuery: string = '';
  currentFilters: FilterCriteria = {
    genre: '',
    year: '',
    customRating: null,
    customYear: null
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.error = '';
    
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.filteredMovies = [...this.movies];
        this.loading = false;
        this.applyFilters();
      },
      error: (error) => {
        this.error = 'Failed to load movies. Please try again later.';
        this.loading = false;
        console.error('Error loading movies:', error);
      }
    });
  }

  onSearchInput(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  onSearchSubmit(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
    
    // Auto-scroll to results section when submitting search
    if (query) {
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  }

  onFilterChange(filters: FilterCriteria): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.movies];

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (this.currentFilters.genre) {
      filtered = filtered.filter(movie =>
        movie.genre_ids.includes(parseInt(this.currentFilters.genre))
      );
    }

    // Apply custom rating filter
    if (this.currentFilters.customRating) {
      filtered = filtered.filter(movie => movie.vote_average >= this.currentFilters.customRating!);
    }

    // Apply year filter (dropdown has priority over custom if both exist)
    if (this.currentFilters.year) {
      filtered = this.filterByYearRange(filtered, this.currentFilters.year);
    } else if (this.currentFilters.customYear) {
      // Use custom year only if dropdown is not selected
      filtered = filtered.filter(movie => {
        const movieYear = new Date(movie.release_date).getFullYear();
        return movieYear === this.currentFilters.customYear;
      });
    }

    this.filteredMovies = filtered;
  }

  private filterByYearRange(movies: Movie[], yearRange: string): Movie[] {
    return movies.filter(movie => {
      const movieYear = new Date(movie.release_date).getFullYear();
      switch (yearRange) {
        case '2020s': return movieYear >= 2020 && movieYear <= 2025;
        case '2010s': return movieYear >= 2010 && movieYear < 2020;
        case '2000s': return movieYear >= 2000 && movieYear < 2010;
        case '1990s': return movieYear >= 1990 && movieYear < 2000;
        case '1980s': return movieYear >= 1980 && movieYear < 1990;
        case '1970s': return movieYear >= 1970 && movieYear < 1980;
        case '1960s': return movieYear >= 1960 && movieYear < 1970;
        case '1940s': return movieYear >= 1940 && movieYear < 1960;
        default: return true;
      }
    });
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }

  // Helper method to get active filter count for display
  getActiveFilterCount(): number {
    let count = 0;
    if (this.currentFilters.genre) count++;
    if (this.currentFilters.year) count++;
    if (this.currentFilters.customRating) count++;
    if (this.currentFilters.customYear) count++;
    if (this.searchQuery) count++;
    return count;
  }
}