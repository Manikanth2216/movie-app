import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie, MovieResponse, Genre } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'YOUR_API_KEY'; // You'll need to get this from TMDB
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  private mockMovies: Movie[] = [
    // ACTION MOVIES
    {
      id: 1,
      title: "The Dark Knight",
      overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
      release_date: "2008-07-18",
      vote_average: 9.0,
      vote_count: 27000,
      genre_ids: [28, 80, 18],
      popularity: 123.4,
      adult: false,
      original_language: "en",
      original_title: "The Dark Knight",
      video: false,
      trailer_url: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
      id: 2,
      title: "Inception",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      release_date: "2010-07-16",
      vote_average: 8.8,
      vote_count: 31000,
      genre_ids: [28, 878, 53],
      popularity: 98.7,
      adult: false,
      original_language: "en",
      original_title: "Inception",
      video: false,
      trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      id: 3,
      title: "The Avengers",
      overview: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
      release_date: "2012-04-25",
      vote_average: 8.0,
      vote_count: 25000,
      genre_ids: [28, 878, 12],
      popularity: 115.2,
      adult: false,
      original_language: "en",
      original_title: "The Avengers",
      video: false,
      trailer_url: "https://www.youtube.com/embed/eOrNdBpGMv8"
    },
    {
      id: 4,
      title: "Mad Max: Fury Road",
      overview: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life.",
      poster_path: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
      backdrop_path: "/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg",
      release_date: "2015-05-15",
      vote_average: 8.1,
      vote_count: 18000,
      genre_ids: [28, 12, 878],
      popularity: 87.5,
      adult: false,
      original_language: "en",
      original_title: "Mad Max: Fury Road",
      video: false,
      trailer_url: "https://www.youtube.com/embed/hEJnMQG9ev8"
    },

    // COMEDY MOVIES
    {
      id: 5,
      title: "The Grand Budapest Hotel",
      overview: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the protégé who becomes his most trusted friend.",
      poster_path: "/eWdyYQrejLuKmM9D7Jr3pWeWiWu.jpg",
      backdrop_path: "/tSEOSt9L9WPBvsT3tJsw1bvqotg.jpg",
      release_date: "2014-03-06",
      vote_average: 8.1,
      vote_count: 15000,
      genre_ids: [35, 18],
      popularity: 78.2,
      adult: false,
      original_language: "en",
      original_title: "The Grand Budapest Hotel",
      video: false,
      trailer_url: "https://www.youtube.com/embed/1Fg5iWmQjwk"
    },
    {
      id: 7,
      title: "Parasite",
      overview: "All unemployed, Ki-taek and his family take peculiar interest in the wealthy and glamorous Parks, until they get entangled in an unexpected incident.",
      poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
      release_date: "2019-05-30",
      vote_average: 8.5,
      vote_count: 16000,
      genre_ids: [35, 53, 18],
      popularity: 92.1,
      adult: false,
      original_language: "ko",
      original_title: "기생충",
      video: false,
      trailer_url: "https://www.youtube.com/embed/5xH0HfJHsaY"
    },

    // HORROR MOVIES
    {
      id: 8,
      title: "Get Out",
      overview: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      poster_path: "/tFXcEccSQMf3lfhfXKSU9iRBma3.jpg",
      backdrop_path: "/uzKba8JkJNGWfNgxfWWIMh0bhJ7.jpg",
      release_date: "2017-02-24",
      vote_average: 7.7,
      vote_count: 13000,
      genre_ids: [27, 53],
      popularity: 88.9,
      adult: false,
      original_language: "en",
      original_title: "Get Out",
      video: false,
      trailer_url: "https://www.youtube.com/embed/DzfpyUB60YY"
    },
    {
      id: 9,
      title: "A Quiet Place",
      overview: "A family lives in silence to avoid creatures that hunt by sound. A father and mother will stop at nothing to protect their children.",
      poster_path: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
      backdrop_path: "/roYyPiQDQKmIKUEhO912693tSja.jpg",
      release_date: "2018-04-06",
      vote_average: 7.5,
      vote_count: 11000,
      genre_ids: [27, 53, 18],
      popularity: 82.3,
      adult: false,
      original_language: "en",
      original_title: "A Quiet Place",
      video: false,
      trailer_url: "https://www.youtube.com/embed/WR7cc5t7tv8"
    },

    // ROMANCE MOVIES
    {
      id: 11,
      title: "The Notebook",
      overview: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
      poster_path: "/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
      backdrop_path: "/evOpme81CUl6xVMN2ISyJBGWOkG.jpg",
      release_date: "2004-06-25",
      vote_average: 7.9,
      vote_count: 14000,
      genre_ids: [10749, 18],
      popularity: 89.7,
      adult: false,
      original_language: "en",
      original_title: "The Notebook",
      video: false,
      trailer_url: "https://www.youtube.com/embed/FC6biTjEyZw"
    },
    {
      id: 12,
      title: "La La Land",
      overview: "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a dedicated jazz musician, scrapes by playing cocktail party gigs in dingy bars.",
      poster_path: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      backdrop_path: "/fp6X2UnZ7lrBi3zGGDOlJ8XB7VD.jpg",
      release_date: "2016-12-09",
      vote_average: 8.0,
      vote_count: 15500,
      genre_ids: [10749, 35, 18, 10402],
      popularity: 95.2,
      adult: false,
      original_language: "en",
      original_title: "La La Land",
      video: false,
      trailer_url: "https://www.youtube.com/embed/0pdqf4P9MB8"
    },
    {
      id: 13,
      title: "Casablanca",
      overview: "A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.",
      poster_path: "/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
      backdrop_path: "/hABIzx2DDs3GWbK2nk1BcCQYTzl.jpg",
      release_date: "1942-11-26",
      vote_average: 8.5,
      vote_count: 9800,
      genre_ids: [10749, 18],
      popularity: 72.1,
      adult: false,
      original_language: "en",
      original_title: "Casablanca",
      video: false,
      trailer_url: "https://www.youtube.com/embed/BkL9l7qovsE"
    },

    // THRILLER MOVIES
    {
      id: 14,
      title: "Se7en",
      overview: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
      poster_path: "/6yoghtyTpznpBik8EngEmJskVUO.jpg",
      backdrop_path: "/Ba8dM9ZXhOohM5mC5pUKYRkUEI.jpg",
      release_date: "1995-09-22",
      vote_average: 8.6,
      vote_count: 18500,
      genre_ids: [80, 18, 53],
      popularity: 91.3,
      adult: false,
      original_language: "en",
      original_title: "Se7en",
      video: false
    },
    {
      id: 15,
      title: "Gone Girl",
      overview: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
      poster_path: "/gdiLTof3rbPDAmPaCf4g6op46bj.jpg",
      backdrop_path: "/bt6aXPlQjOakOZxObWZKrVh3l0A.jpg",
      release_date: "2014-10-01",
      vote_average: 8.1,
      vote_count: 16200,
      genre_ids: [18, 9648, 53],
      popularity: 87.6,
      adult: false,
      original_language: "en",
      original_title: "Gone Girl",
      video: false
    },

    // ANIMATION MOVIES
    {
      id: 16,
      title: "Spirited Away",
      overview: "A ten-year-old girl who, while moving to a new neighborhood, enters the world of Kami (spirits of Japanese Shinto folklore).",
      poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      backdrop_path: "/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg",
      release_date: "2001-07-20",
      vote_average: 9.3,
      vote_count: 14800,
      genre_ids: [16, 10751, 14],
      popularity: 96.8,
      adult: false,
      original_language: "ja",
      original_title: "千と千尋の神隠し",
      video: false,
      trailer_url: "https://www.youtube.com/embed/ByXuk9QqQkk"
    },
    {
      id: 17,
      title: "Toy Story",
      overview: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
      poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      backdrop_path: "/2MFIhZAW0CVlEQrFyqwa4U6NOWl.jpg",
      release_date: "1995-10-30",
      vote_average: 8.3,
      vote_count: 16500,
      genre_ids: [16, 10751, 35],
      popularity: 89.4,
      adult: false,
      original_language: "en",
      original_title: "Toy Story",
      video: false,
      trailer_url: "https://www.youtube.com/embed/KYz2wyBy3kc"
    },
    {
      id: 18,
      title: "WALL·E",
      overview: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
      poster_path: "/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
      backdrop_path: "/9cJETuLMc6R0bTORA3RmNNqKproB.jpg",
      release_date: "2008-06-27",
      vote_average: 8.4,
      vote_count: 17200,
      genre_ids: [16, 10751, 878],
      popularity: 93.7,
      adult: false,
      original_language: "en",
      original_title: "WALL·E",
      video: false,
      trailer_url: "https://www.youtube.com/embed/CZ1CATNbXg0"
    },

    // CRIME/DRAMA MOVIES
    {
      id: 19,
      title: "Pulp Fiction",
      overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
      poster_path: "/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
      backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
      release_date: "1994-09-10",
      vote_average: 8.9,
      vote_count: 24000,
      genre_ids: [80, 18],
      popularity: 89.1,
      adult: false,
      original_language: "en",
      original_title: "Pulp Fiction",
      video: false,
      trailer_url: "https://www.youtube.com/embed/s7EdQ4FqbhY"
    },
    {
      id: 20,
      title: "The Godfather",
      overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      release_date: "1972-03-14",
      vote_average: 9.2,
      vote_count: 19000,
      genre_ids: [80, 18],
      popularity: 95.6,
      adult: false,
      original_language: "en",
      original_title: "The Godfather",
      video: false,
      trailer_url: "https://www.youtube.com/embed/sY1S34973zA"
    },
    {
      id: 21,
      title: "Forrest Gump",
      overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
      poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      backdrop_path: "/7c9UVPPiTPltouxRVY6N9lvjLLs.jpg",
      release_date: "1994-06-23",
      vote_average: 8.8,
      vote_count: 26000,
      genre_ids: [18, 10749],
      popularity: 87.3,
      adult: false,
      original_language: "en",
      original_title: "Forrest Gump",
      video: false,
      trailer_url: "https://www.youtube.com/embed/bLvqoHBptjg"
    },

    // SCI-FI MOVIES
    {
      id: 22,
      title: "The Matrix",
      overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
      release_date: "1999-03-30",
      vote_average: 8.7,
      vote_count: 22000,
      genre_ids: [28, 878],
      popularity: 92.8,
      adult: false,
      original_language: "en",
      original_title: "The Matrix",
      video: false,
      trailer_url: "https://www.youtube.com/embed/vKQi3bBA1y8"
    },
    {
      id: 23,
      title: "Interstellar",
      overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      release_date: "2014-10-26",
      vote_average: 8.6,
      vote_count: 32000,
      genre_ids: [878, 18, 12],
      popularity: 104.7,
      adult: false,
      original_language: "en",
      original_title: "Interstellar",
      video: false,
      trailer_url: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
      id: 24,
      title: "Blade Runner 2049",
      overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
      poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      backdrop_path: "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
      release_date: "2017-10-04",
      vote_average: 8.0,
      vote_count: 13500,
      genre_ids: [878, 18],
      popularity: 85.2,
      adult: false,
      original_language: "en",
      original_title: "Blade Runner 2049",
      video: false,
      trailer_url: "https://www.youtube.com/embed/gCcx85zbxz4"
    },

    // WESTERN MOVIES
    {
      id: 25,
      title: "The Good, the Bad and the Ugly",
      overview: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
      poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
      backdrop_path: "/eCHo7Ns8kvYWhzW8SEhOGAN8n99.jpg",
      release_date: "1966-12-23",
      vote_average: 8.8,
      vote_count: 8900,
      genre_ids: [37],
      popularity: 67.8,
      adult: false,
      original_language: "it",
      original_title: "Il buono, il brutto, il cattivo",
      video: false
    },
    {
      id: 26,
      title: "Django Unchained",
      overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      poster_path: "/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
      backdrop_path: "/2oZklIzUbvZXXzIFzv7Hi68d6xf.jpg",
      release_date: "2012-12-25",
      vote_average: 8.1,
      vote_count: 14200,
      genre_ids: [37, 18],
      popularity: 82.4,
      adult: false,
      original_language: "en",
      original_title: "Django Unchained",
      video: false
    },

    // WAR MOVIES
    {
      id: 27,
      title: "Saving Private Ryan",
      overview: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
      poster_path: "/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
      backdrop_path: "/hMV9hhp9jJFj8QdgjzJ2Zq3Zkl7.jpg",
      release_date: "1998-07-24",
      vote_average: 8.6,
      vote_count: 13800,
      genre_ids: [10752, 18],
      popularity: 88.9,
      adult: false,
      original_language: "en",
      original_title: "Saving Private Ryan",
      video: false
    },
    {
      id: 28,
      title: "1917",
      overview: "During World War I, two British soldiers are given a seemingly impossible mission: deliver a message that will stop a doomed attack on hundreds of soldiers.",
      poster_path: "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
      backdrop_path: "/5ucHZI4eWiNXhCnO3LYa4QxTOx0.jpg",
      release_date: "2019-12-25",
      vote_average: 8.2,
      vote_count: 9600,
      genre_ids: [10752, 18],
      popularity: 79.3,
      adult: false,
      original_language: "en",
      original_title: "1917",
      video: false
    }
  ];

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<MovieResponse> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          page: 1,
          results: this.mockMovies,
          total_pages: 1,
          total_results: this.mockMovies.length
        });
        observer.complete();
      }, 1000); // 1 second delay to show loading
    });
  }

  searchMovies(query: string): Observable<MovieResponse> {
    const filteredMovies = this.mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    
    return of({
      page: 1,
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length
    });
  }

  getMovieById(id: number): Observable<Movie> {
    return new Observable(observer => {
      setTimeout(() => {
        const movie = this.mockMovies.find(m => m.id === id);
        if (movie) {
          observer.next(movie);
          observer.complete();
        } else {
          observer.error('Movie not found');
        }
      }, 500); // Simulate API delay
    });
  }

  getImageUrl(path: string): string {
    // Comprehensive movie poster mapping
    const moviePosters: { [key: string]: string } = {
      // Action Movies
      '/qJ2tW6WMUDux911r6m7haRef0WH.jpg': 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
      '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg': 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg': 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      '/hA2ple9q4qnwxp3hKVNhroipsir.jpg': 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      
      // Comedy Movies  
      '/eWdyYQrejLuKmM9D7Jr3pWeWiWu.jpg': 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
      '/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg': 'https://m.media-amazon.com/images/M/MV5BYzE4MmM4YmUtMzg3Ni00NGM1LWJmOWMtOGZhOGRmZGQwN2ZiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
      
      // Horror Movies
      '/tFXcEccSQMf3lfhfXKSU9iRBma3.jpg': 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg',
      '/nAU74GmpUk7t5iklEp3bufwDq4n.jpg': 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg',
      '/p81a0dtOKSpJEOpwV7NU8Mx5X5A.jpg': 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZDlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_SX300.jpg',
      
      // Romance Movies
      '/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg': 'https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_SX300.jpg',
      '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg': 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg',
      '/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg': 'https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
      
      // Thriller Movies
      '/6yoghtyTpznpBik8EngEmJskVUO.jpg': 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      '/gdiLTof3rbPDAmPaCf4g6op46bj.jpg': 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg',
      
      // Animation Movies
      '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg': 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg': 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
      '/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg': 'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_SX300.jpg',
      
      // Crime/Drama Movies
      '/dM2w364MScsjFf8pfMbaWUcWrR.jpg': 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg': 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg': 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      
      // Sci-Fi Movies
      '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg': 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg': 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg': 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
      
      // Western Movies
      '/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg': 'https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX300.jpg',
      '/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg': 'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg',
      
      // War Movies
      '/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg': 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
      '/iZf0KyrE25z1sage4SYFLCCrMi9.jpg': 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg'
    };
    
    return moviePosters[path] || 'https://via.placeholder.com/300x450/667eea/ffffff?text=Movie+Poster';
  }
}