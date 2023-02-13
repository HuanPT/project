import "@assets/css/index.css";
import "@assets/css/home.css";

import * as api from "./api.js";
import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";
import * as customCarousel from "./customCarousel.js";

import {
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  loading,
} from "./common";

const main = document.querySelector(".main");
const mainContainer = main.querySelector(".container");
const mainRow = mainContainer.querySelector(".row");

let genres = [
  {
    id: 28,
    name: "Phim Hành Động",
  },
  {
    id: 12,
    name: "Phim Phiêu Lưu",
  },
  {
    id: 16,
    name: "Phim Hoạt Hình",
  },
  {
    id: 35,
    name: "Phim Hài",
  },
  {
    id: 10751,
    name: "Phim Gia Đình",
  },
  {
    id: 14,
    name: "Phim Giả Tượng",
  },
  {
    id: 36,
    name: "Phim Lịch Sử",
  },
  {
    id: 27,
    name: "Phim Kinh Dị",
  },
  {
    id: 9648,
    name: "Phim Bí Ẩn",
  },
  {
    id: 878,
    name: "Phim Khoa Học Viễn Tưởng",
  },
];

const fetchMoviesListByGenres = (id) => {
  return fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => data.results);
};

const callAPI = () => {
  const promises = genres.map((genre) => fetchMoviesListByGenres(genre.id));
  Promise.all(promises).then((dataArray) => {
    dataArray.forEach((data, i) => {
      if (i % 2 === 0) {
        makeCategoryElementSlide(genres[i].name, data, genres[i].id);
        customCarousel.carousel(data);
      } else {
        makeCategoryElementBig(genres[i].name, data, genres[i].id);
      }
    });
  });
};

const makeCategoryElementBig = (category, data, id) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?with_genres=${id}" class="view-all">
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
      if (i > 0 && i < 4) {
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
      if (i > 3 && i < 7) {
        rowG2.innerHTML += `
          <div class="col-6 col-md-4 gy-3">
            <div class="card__movie">
              <a href="/movie.html?${item.id}" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>`;
      }
      if (i > 6 && i <= 10) {
        movieContainer.innerHTML += `
          <div class="col-6 col-md-3 gy-3">
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

  loading();
};

const makeCategoryElementSlide = (category, data, id) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?with_genres=${id}" class="view-all">
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

window.onload = () => {
  callAPI();
  navSearchMobile();
  navSearchDesktop();
  navMobile();
  headerOnTop();
};
