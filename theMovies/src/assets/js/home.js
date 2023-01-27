import "@lib/jquery-3.6.1.min.js";
import * as customCarousel from "./customCarousel.js";
import "@assets/css/index.css";
import "@assets/css/home.css";
import "@assets/css/responsiveIndex.css";

import * as api from "./api.js";
import "@fortawesome/fontawesome-free/js/all.min.js";
// import "@assets/js/search.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { navSearchDesktop, navSearchMobile, navMobile } from "./common";
const header = document.querySelector("header");
const main = document.querySelector(".main");
const mainContainer = main.querySelector(".container");
const mainRow = mainContainer.querySelector(".row");

fetch(
  api.genresList +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.genres);
    data.genres.forEach((item, i) => {
      // console.log(item, i);
      if (i < 11) {
        if (i !== 5) {
          if (i % 2 == 0) {
            fetchMoviesListByGenres(item.id, item.name);
          } else {
            fetchMoviesListByCardBig(item.id, item.name);
          }
        }
      }
    });
  });

const fetchMoviesListByGenres = (id, genres) => {
  fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
        page: 1,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      makeCategoryElementSlide(genres, data.results);
      customCarousel.carousel(data);
    })
    .catch((err) => console.log("err"));
};

const makeCategoryElementSlide = (category, data) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?q=${category}" class="view-all">
            Xem tất cả
            <i class="fa-solid fa-angles-right"></i>
          </a>
        </div>
        <div class="movie__container">
          <div id="${category}" class="owl-carousel owl-theme nominated-slide">
          
          </div>
        </div>
      </div>
  `;
  makeCardsSlide(category, data);
};

const makeCardsSlide = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    movieContainer.innerHTML += `
      <div class="item">
        <div class="card__movie">
          <a href="/movie.html?${item.id}" title="${item.title}">
            <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
            <p class="movie-title">${item.title}</p>
            <div class="icon-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </a>
        </div>
      </div>
    `;
  });
};

const fetchMoviesListByCardBig = (id, genres) => {
  fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      makeCategoryElementBig(genres, data.results);
    })
    .catch((err) => console.log("err"));
};

const makeCategoryElementBig = (category, data) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?q=${category}" class="view-all">
            Xem tất cả
            <i class="fa-solid fa-angles-right"></i>
          </a>
        </div>
        <div class="movie__container">
          <div id="${category}" class="row gy-2">
          
          </div>
        </div>
      </div>
  `;
  makeCardsBig(category, data);
};

const makeCardsBig = (id, data) => {
  const movieContainer = document.getElementById(id);

  const colMd5 = document.createElement("div");
  colMd5.classList.add("col-12", "col-md-5");

  const colMd7 = document.createElement("div");
  colMd7.classList.add("col-md-7");
  const rowG2 = document.createElement("div");
  rowG2.classList.add("row", "gy-2");
  colMd7.appendChild(rowG2);

  movieContainer.append(colMd5, colMd7);

  // console.log(data);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    if (i < 11) {
      if (i == 0) {
        colMd5.innerHTML += `
          <div class="card__movie card__movie-big">
          <a href="/movie.html?${item.id}" title="${item.title}">
            <img src="${api.imgOriginalUrl}${item.backdrop_path}" alt="${item.title}">
            <p class="movie-title">${item.title}</p>
            <div class="icon-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </a>
        </div>
        `;
      }
      if (i > 0 && i < 7) {
        rowG2.innerHTML += `
          <div class="col-6 col-md-4">
            <div class="card__movie">
              <a href="/movie.html?${item.id}" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
      }
      if (i > 6 && i <= 10) {
        movieContainer.innerHTML += `
          <div class="col-6 col-md-3">
            <div class="card__movie">
              <a href="/movie.html?${item.id}" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
      }
    }
  });
};

window.onload = () => {
  navSearchMobile();
  navSearchDesktop();
  navMobile();
};
