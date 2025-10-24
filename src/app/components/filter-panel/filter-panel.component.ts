import { Component, Output, EventEmitter } from '@angular/core';

export interface FilterCriteria {
  genre: string;
  year: string;
  customRating: number | null;
  customYear: number | null;
}

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent {
  @Output() filterChange = new EventEmitter<FilterCriteria>();

  selectedGenre: string = '';
  selectedYear: string = '';
  customRating: number | null = null;
  customYear: number | null = null;

  // ✨ COMPLETE GENRE LIST - All 30 movies now accessible!
  genres = [
    { id: '', name: 'All Genres' },
    { id: '28', name: '🎬 Action' },
    { id: '12', name: '🗺️ Adventure' },
    { id: '16', name: '🎨 Animation' },
    { id: '35', name: '😄 Comedy' },
    { id: '80', name: '🔫 Crime' },
    { id: '99', name: '📚 Documentary' },
    { id: '18', name: '🎭 Drama' },
    { id: '10751', name: '👨‍👩‍👧‍👦 Family' },
    { id: '14', name: '🧙‍♂️ Fantasy' },
    { id: '27', name: '👻 Horror' },
    { id: '10402', name: '🎵 Music' },
    { id: '9648', name: '🔍 Mystery' },
    { id: '10749', name: '💕 Romance' },
    { id: '878', name: '🚀 Science Fiction' },
    { id: '10770', name: '📺 TV Movie' },
    { id: '53', name: '😱 Thriller' },
    { id: '10752', name: '⚔️ War' },
    { id: '37', name: '🤠 Western' }
  ];

  // Enhanced year ranges for your movie collection (1942-2019)
  years = [
    { value: '', label: 'All Years' },
    { value: '2020s', label: '🔥 2020s (2020-2025)' },
    { value: '2010s', label: '✨ 2010s (2010-2019)' },
    { value: '2000s', label: '🎯 2000s (2000-2009)' },
    { value: '1990s', label: '🎪 1990s (1990-1999)' },
    { value: '1980s', label: '⚡ 1980s (1980-1989)' },
    { value: '1970s', label: '🎸 1970s (1970-1979)' },
    { value: '1960s', label: '🎬 1960s (1960-1969)' },
    { value: '1940s', label: '🏛️ 1940s & Earlier' }
  ];

  onFilterChange(): void {
    this.emitFilters();
  }

  onCustomRatingChange(): void {
    this.emitFilters();
  }

  onCustomYearChange(): void {
    if (this.customYear) {
      this.selectedYear = ''; // Clear dropdown when using custom input
    }
    this.emitFilters();
  }

  private emitFilters(): void {
    const filters: FilterCriteria = {
      genre: this.selectedGenre,
      year: this.selectedYear,
      customRating: this.customRating,
      customYear: this.customYear
    };
    this.filterChange.emit(filters);
  }

  clearFilters(): void {
    this.selectedGenre = '';
    this.selectedYear = '';
    this.customRating = null;
    this.customYear = null;
    this.emitFilters();
  }

  // Individual filter clearing methods
  clearGenre(): void {
    this.selectedGenre = '';
    this.emitFilters();
  }

  clearCustomRating(): void {
    this.customRating = null;
    this.emitFilters();
  }

  clearYear(): void {
    this.selectedYear = '';
    this.emitFilters();
  }

  clearCustomYear(): void {
    this.customYear = null;
    this.emitFilters();
  }

  // Helper methods for active filters display
  hasActiveFilters(): boolean {
    return this.selectedGenre !== '' || 
           this.selectedYear !== '' ||
           this.customRating !== null ||
           this.customYear !== null;
  }

  getGenreName(genreId: string): string {
    const genre = this.genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  }

  getYearLabel(yearValue: string): string {
    const year = this.years.find(y => y.value === yearValue);
    return year ? year.label : '';
  }
}