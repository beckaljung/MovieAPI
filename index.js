/* ------------MOVIEAPI--------------------------------------------------------------------------
    (Run code comand for the terminal: node index.js)
    Made by: Rebecka Ljung, beckaljung@hotmail.com

    Changes made: returns from the funcitons that was supose to prints the result
 -------------------------------------------------------------------------------------- */

// Class for one individual movie
class Movie {
    constructor(id, json,) {
        Object.assign(this, json);
        this.id = id;       // the id will me integers from 0 and up. Increasing in order of how the movies was added
        this.rating = (Math.floor(Math.random() * (50 - 10)) + 10) / 10;
    }
};

// Class for a list of movies 
class MovieAPI {
    constructor(moviesJson) {
        this.movies = this.convertToMovie(moviesJson);
        this.numberOfAddedMovies= moviesJson.length;
    }

    // Create list of movies as class instances of Movie
    convertToMovie(moviesJson){
        let movieList = [];
        moviesJson.forEach((movie, index) => {
        movieList.push(new Movie(index, movie));
        });
        return movieList;
    }

    //Return all movies
    allMovies() {
        return this.movies;
    }

    // A method that returns movies from a certain genre. (Note that "Action Comedi" will fitt in both the "Comedi", the "Action" and the "Action Comedi" genre)
    moviesInGenre(genre) {
        let movieInGenre = this.movies.filter(x => x.genre.toLowerCase().includes(genre.toLowerCase()));
        return movieInGenre;
    }

    //A method that removes a movie with a certain id (if found).
    removeMovie(id) {
        const indexOfMovie = this.movies.findIndex((movie) => movie.id == id);
        if (indexOfMovie > -1) {
            this.movies.splice(indexOfMovie, 1);
        }
    }

    //A method that returns the movies with the subtitle and thumb properties filtered out.
    filteredMovies() {
        let filteredMovies= this.movies;
        filteredMovies.forEach(movie =>{
            delete movie.thumb;
            delete movie.subtitle;
        })
        return filteredMovies;
    }

    //  A method that returns the movies sorted by name. (If movieLefts comes before movieRight alphabetically "switch places" (the movieRight then has the higher priority than movieLeft))
    sortByTitle() {
        const sortedByTitle = this.movies.sort((movieLeft, movieRight) => (movieLeft.title > movieRight.title) ? 1 : -1 );
        return sortedByTitle;
    }

    // A method that returns the 2 top rated movies and 2 bottom rated movies.
    topTwoBottomTwoMovies() {
        const topSorted = this.sortTopToBottomMovies();
        let topTwoMovies=[];
        topTwoMovies.push(topSorted[0]);
        topTwoMovies.push(topSorted[1]);
        let bottomTwoMovies=[];
        bottomTwoMovies.push(topSorted[topSorted.length -1]);
        bottomTwoMovies.push(topSorted[topSorted.length -2]);
        return [topTwoMovies, bottomTwoMovies];
    }

    // A method that return out the three top rated movies.
    topThreeMovies() {
        const topSorted = this.sortTopToBottomMovies();
        let topThree= [];
        topThree.push(topSorted[0]);
        topThree.push(topSorted[1]);
        topThree.push(topSorted[2]);
        return topThree;
    }

    //  A method that return out movies sorted from top rated to bottom rated. (If movieLefts rating is lower than movieRight "switch places" (the movieRight then has the higher priority than movieLeft))
    sortTopToBottomMovies() {
        let sortedTopToBottom = this.movies.sort((movieLeft, movieRight) => (movieLeft.rating < movieRight.rating) ? 1 : -1);
        return sortedTopToBottom;
    }

    //  A method that prints out movies sorted from bottom rated to top rated.(If movieLefts rating is higher than movieRight "switch places" (the movieRight then has the higher priority than movieLeft))
    sortBottomToTopMovies() {
        const sortedBottomToTop = this.movies.sort((movieLeft, movieRight) => (movieLeft.rating > movieRight.rating) ? 1 : -1);
        return sortedBottomToTop;
    }

    //A method that allows the user to add a new movie object to the movie list (supply all properties but the “id” and “rating”. The “id” and “rating” properties should be added internally by the method.
    addMovie(movie) {
        const newMovie = new Movie(this.numberOfAddedMovies, movie);
        this.numberOfAddedMovies++;
        this.movies.splice(this.movies.length, 0, newMovie);
    }

    //A method that returns a movie with a certain id (if found).If the id for the movie doesn't exist it will return undefiend
    findMovie(searchedId) {
        const movie = this.movies.find(({ id }) => id === searchedId)
        return movie;
    }

    //  A method that changes the title of a movie with a certain id (if found). The updated title should be sent in as an argument to the method.
    changeTitle(id, newtitle) {
        this.movies.forEach(movie =>{
            if(movie.id == id){
                movie.title = newtitle;
            }
        })
    }
}

/*-------------------------- MAIN -----------------------------------*/

// --- Load the moviedata ---
const moviesJson = require('./movies.json');

// --- Initiate the MovieAPI---
const movieAPI = new MovieAPI(moviesJson);

// --- Return all movies ---
//const allMovies = movieAPI.allMovies();
//console.log(allMovies);

// --- Return movies in specific genre ---
//const genreMovies = movieAPI.moviesInGenre("Sci-Fi");
//console.log(genreMovies);

// --- Remove movie with id ---
//movieAPI.removeMovie(0);
//const allMoviesAfterRemove = movieAPI.allMovies();
// console.log(allMoviesAfterRemove)

// --- Return movielist with the thumb and subtitle attribute deleted ---
//const filterdMovies= movieAPI.filteredMovies();
//console.log(filterdMovies)

// --- Return the list sorted by title ---
//const sortedByTitle= movieAPI.sortByTitle();
//const allMoviesAfterSortTitle = movieAPI.allMovies();
//console.log(allMoviesAfterSortTitle);

// --- Return the two movies with the best and worst rating ---
//const [topTwoMovies, bottomTwoMovies]= movieAPI.topTwoBottomTwoMovies();
//console.log(topTwoMovies);
//console.log(bottomTwoMovies);

// --- Return the three movies with the best rating ---
//const threeTopMovies= movieAPI.topThreeMovies();
//console.log(threeTopMovies);

// --- Return sorted from worst to best movie rating ---
//const sortedWorstMovies= movieAPI.sortBottomToTopMovies();
//console.log(sortedWorstMovies);

// --- Add a movie ---
/*const newMovie={
        "description":"This is a newly added movie to this dataset.",
        "sources":[
           "http://madeuplink.mp4"
        ],
        "subtitle":"By Becka",
        "thumb":"images/newmovie.jpg",
        "title":"New Movie",
        "genre": "Drama"
};
movieAPI.addMovie(newMovie);
const allMoviesAfterAddedMovie = movieAPI.allMovies();
 console.log(allMoviesAfterAddedMovie);
*/

// --- Return a specific movie, via its id ---
//const foundMovie= movieAPI.findMovie(2);
//console.log(foundMovie);

// --- Change the title of a movie, via its id ---
//movieAPI.changeTitle(0, "Change Title");
//const allMoviesAfterChangeTitle = movieAPI.allMovies();
// console.log(allMoviesAfterChangeTitle);

