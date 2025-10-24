### Step 1: Set Up the Angular Project

1. **Install Angular CLI** (if you haven't already):
   ```bash
   npm install -g @angular/cli
   ```

2. **Create a new Angular project**:
   ```bash
   ng new movie-app
   cd movie-app
   ```

3. **Install Axios** for making API calls:
   ```bash
   npm install axios
   ```

### Step 2: Create Components

1. **Generate components** for the app:
   ```bash
   ng generate component movie-list
   ng generate component movie-search
   ng generate component movie-detail
   ```

### Step 3: Set Up the Movie Service

Create a service to handle API calls.

1. **Generate a service**:
   ```bash
   ng generate service movie
   ```

2. **Implement the Movie Service** (`src/app/movie.service.ts`):
   ```typescript
   import { Injectable } from '@angular/core';
   import axios from 'axios';

   @Injectable({
     providedIn: 'root'
   })
   export class MovieService {
     private apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
     private apiUrl = 'https://api.themoviedb.org/3';

     constructor() { }

     async searchMovies(query: string) {
       const response = await axios.get(`${this.apiUrl}/search/movie`, {
         params: {
           api_key: this.apiKey,
           query: query
         }
       });
       return response.data.results;
     }

     async getGenres() {
       const response = await axios.get(`${this.apiUrl}/genre/movie/list`, {
         params: {
           api_key: this.apiKey
         }
       });
       return response.data.genres;
     }
   }
   ```

### Step 4: Implement the Movie Search Component

1. **Update the Movie Search Component** (`src/app/movie-search/movie-search.component.ts`):
   ```typescript
   import { Component, EventEmitter, Output } from '@angular/core';
   import { MovieService } from '../movie.service';

   @Component({
     selector: 'app-movie-search',
     templateUrl: './movie-search.component.html',
     styleUrls: ['./movie-search.component.css']
   })
   export class MovieSearchComponent {
     query: string = '';
     @Output() search = new EventEmitter<string>();

     constructor(private movieService: MovieService) {}

     onSearch() {
       this.search.emit(this.query);
     }
   }
   ```

2. **Update the Movie Search Template** (`src/app/movie-search/movie-search.component.html`):
   ```html
   <div>
     <input [(ngModel)]="query" placeholder="Search for movies..." />
     <button (click)="onSearch()">Search</button>
   </div>
   ```

### Step 5: Implement the Movie List Component

1. **Update the Movie List Component** (`src/app/movie-list/movie-list.component.ts`):
   ```typescript
   import { Component, Input } from '@angular/core';

   @Component({
     selector: 'app-movie-list',
     templateUrl: './movie-list.component.html',
     styleUrls: ['./movie-list.component.css']
   })
   export class MovieListComponent {
     @Input() movies: any[] = [];
   }
   ```

2. **Update the Movie List Template** (`src/app/movie-list/movie-list.component.html`):
   ```html
   <div *ngFor="let movie of movies">
     <h3>{{ movie.title }}</h3>
     <p>Rating: {{ movie.vote_average }}</p>
   </div>
   ```

### Step 6: Implement the Main App Component

1. **Update the Main App Component** (`src/app/app.component.ts`):
   ```typescript
   import { Component } from '@angular/core';
   import { MovieService } from './movie.service';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
   })
   export class AppComponent {
     movies: any[] = [];

     constructor(private movieService: MovieService) {}

     async onSearch(query: string) {
       this.movies = await this.movieService.searchMovies(query);
     }
   }
   ```

2. **Update the Main App Template** (`src/app/app.component.html`):
   ```html
   <h1>Movie App</h1>
   <app-movie-search (search)="onSearch($event)"></app-movie-search>
   <app-movie-list [movies]="movies"></app-movie-list>
   ```

### Step 7: Add Angular Forms Module

To use `ngModel` for two-way data binding, you need to import the `FormsModule`.

1. **Update the App Module** (`src/app/app.module.ts`):
   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms'; // Import FormsModule

   import { AppComponent } from './app.component';
   import { MovieListComponent } from './movie-list/movie-list.component';
   import { MovieSearchComponent } from './movie-search/movie-search.component';

   @NgModule({
     declarations: [
       AppComponent,
       MovieListComponent,
       MovieSearchComponent
     ],
     imports: [
       BrowserModule,
       FormsModule // Add FormsModule here
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

### Step 8: Run the Application

1. **Run the application**:
   ```bash
   ng serve
   ```

2. **Open your browser** and navigate to `http://localhost:4200`.

### Conclusion

You now have a basic Angular movie app that allows users to search for movies by title. You can further enhance this application by adding features like filtering by genre, displaying movie details, and improving the UI with CSS or a UI framework like Angular Material. Make sure to replace `YOUR_API_KEY` with a valid API key from The Movie Database (TMDb) API.