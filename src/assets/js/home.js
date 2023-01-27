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

const makeHeader = () => {
  header.innerHTML += `
    <div class="container">
      <div class="row">

        <div class="col-12 d-md-none heade__Mobile">
          <div class="header__top-wrap">
            <div class="header__search">

              <div class="dropdown">
                <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <form class="search__form">
                      <label class="input-tag">
                          <input type="text" id="search__mobile">
                          <span class="place">
                              Tìm kiếm
                          </span>
                      </label>
                  </form>
                </div>
              </div>
            </div>


            <div class="header__top-logo">
              <a href="/"><img src="./assets/img/paner.png" alt="logo"></a>
            </div>

            <div class="header__navbars">
              <div class="btn__navbars">
                <i class="fa-solid fa-bars"></i>
              </div>
              <div class="navbars__mobile-detail">
                <div class="overlay"></div>
                <div class="navbars__mobile-wrap">
                  <div class="navbars__mobile-header">
                    <div class="mobile__user-name">
                      <h3>Chào HuanPT!</h3>
                      <div class="user__name-avatar">
                        <i class="fa-solid fa-user"></i>
                      </div>
                    </div>
                  </div>

                  <div class="navbars__mobile-main">
                    <ul class="navbars__mobile-list">
                      <li>
                        <a href="#" class="user-menu-item">
                          <i class="fa-solid fa-circle-info"></i>
                          Tài khoản
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          <i class="fa-solid fa-heart"></i>
                          Phim yêu thích
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          <i class="fa-solid fa-bookmark"></i>
                          Phim đã lưu
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          <i class="fa-solid fa-clock-rotate-left"></i>
                          Lịch sử xem</a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          <i class="fa-solid fa-arrow-right-from-bracket"></i>
                          Đăng xuất
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          Phim hot
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          Phim lẻ
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          Phim bộ
                        </a>
                      </li>
                      <li>
                        <a href="#" class="user-menu-item">
                          Phim mới
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 d-none d-md-block header__desktop">
          <div class="header__top-wrap">


            <div class="header__top-logo">
              <a href="/"><img src="./assets/img/paner.png" alt="logo"></a>
            </div>

            <div class="header__center d-flex">
              <ul class="header__center-menu d-flex">
                <li class="center-menu-item">
                  <a href="#">Phim hot</a>
                </li>
                <li class="center-menu-item">
                  <a href="#">Phim lẻ</a>
                </li>
                <li class="center-menu-item">
                  <a href="#">Phim bộ</a>
                </li>
                <li class="center-menu-item">
                  <a href="#">Phim mới</a>
                </li>
              </ul>

              <div class="header__center-search">
                <form class="search__form">
                    <label class="input-tag">
                        <input type="text" id="search__desktop">
                        <span class="place">
                            Tìm kiếm
                        </span>
                    </label>
                </form>
              </div>
            </div>

            <div class="header__nav-user d-flex">
              <i class="user-icon fa-solid fa-user"></i>

              <div class="header__nav-wrap">
                <div class="triangle"></div>
                <ul class="nav-user-menu">
                  <li>
                    <a class="user-menu-item" href="/account.html"><i class="fa-solid fa-circle-info"></i>
                      Tài khoản
                    </a>
                  </li>
                  <li>
                    <a href="/account.html" class="user-menu-item">
                      <i class="fa-solid fa-heart"></i>
                      Phim yêu thích
                    </a>
                  </li>
                  <li>
                    <a class="user-menu-item" href="/account.html"><i class="fa-solid fa-bookmark"></i>
                      Phim đã lưu
                    </a>
                  </li>
                  <li>
                    <a class="user-menu-item" href="/account.html"><i class="fa-solid fa-clock-rotate-left"></i>
                      Lịch sử xem
                    </a>
                  </li>
                  <li>
                    <a class="user-menu-item" href="/account.html"><i class="fa-solid fa-right-from-bracket"></i>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
};

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
      if (i < 11 && i !== 5) {
        if (i % 2 == 0) {
          fetchMoviesListByGenres(item.id, item.name);
        } else {
          fetchMoviesListByCardBig(item.id, item.name);
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
  // makeHeader();
  navSearchMobile();
  navSearchDesktop();
  navMobile();
};
