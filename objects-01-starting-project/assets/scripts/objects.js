"use strict";
const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    if ('info' in movie) {

    }
    const {info, ...otherProps} = movie;
    console.log(otherProps);
    // const {title:moveiTitle} = info; //Object destructuring

    let {getFormattedTitle} = movie;
    // let text = info.title + " - "; //chaining in objects
    // let text = moveiTitle.toUpperCase() + " - "; //chaining
    // getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + " - ";
    for (const key in info) {
      if (key !== "title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.appendChild(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    alert("You have not entered a movie name!");
    return;
  }

  const newMovie = {
    info: {
     /*  set title(value) {
        if (value.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val
      },//setter
      get title() {},//getter */
      title, //Shorthand for title: title
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };

  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();

  const clearInputs = () => {
    let inputTitle = document.getElementById("title");
    let inputExtraName = document.getElementById("extra-name");
    let inputExtraValue = document.getElementById("extra-value");

    inputTitle.value = "";
    inputExtraName.value = "";
    inputExtraValue.value = "";
  };
  clearInputs();
};

const searchMovieHandler = () => {
  console.log(this);
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
