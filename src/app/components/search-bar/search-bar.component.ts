import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchQuery = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<string>();
  
  searchTerm: string = '';
  showSuggestions: boolean = false;
  isFocused: boolean = false;

  onSearch(): void {
    this.searchSubmit.emit(this.searchTerm.trim());
  }

  onInput(): void {
    // Emit for real-time filtering but don't trigger scroll
    this.searchQuery.emit(this.searchTerm.trim());
  }

  onClear(): void {
    this.searchTerm = '';
    this.showSuggestions = false;
    this.searchQuery.emit('');
  }

  onFocus(): void {
    this.isFocused = true;
    if (this.searchTerm) {
      this.showSuggestions = true;
    }
  }

  onBlur(): void {
    this.isFocused = false;
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}