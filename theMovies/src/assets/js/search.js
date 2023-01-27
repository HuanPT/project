import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/person.css";
import "@assets/css/search.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import { navSearchDesktop, navSearchMobile } from "./common";

let keyword = decodeURI(location.search.replace("?q=", ""));

let page = 1;
fetch(
  api.searchMovie +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language +
    "&page" +
    page +
    `&query=${keyword}`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderListSearch(data);
    keyWord();
  });

const renderListSearch = (data) => {
  const list = document.querySelector(".list__film");
  const items = data.results;
  if (items == 0) {
    const title = document.querySelector(".search__title");
    title.innerHTML = `Không có kết quả cho từ khóa: <span class="search__keyword"></span>`;
  }
  items.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    list.innerHTML += `
        <li class="card__movie">
            <a href="./movie.html?${item.id}" class="d-block d-md-none" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}"
                    alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
            <a href="./movie.html?${item.id}" class="d-none d-md-block" title="${item.title}">
                <img src="${api.imgUrlW220}${item.poster_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
        </li>
        `;
  });
};

const keyWord = () => {
  const keywordText = document.querySelector(".search__keyword");
  keywordText.innerHTML = keyword.replaceAll("%20", " ");
};

window.onload = () => {
  navSearchDesktop();
  navSearchMobile();
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
    listGenres(data);
  });

const listGenres = (data) => {
  console.log(data);
  const genres = document.querySelector("#filter__item-genres");
  console.log(genres);
  data.genres.forEach((item, i) => {
    if (i == 0) {
      genres.innerHTML += `
      <option value> -- Thể loại -- </option>
      `;
    } else {
      genres.innerHTML += `
        <option value="${item.id}">${item.name}</option>
      `;
    }
  });
};

fetch(
  api.countryList +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    filterCountry(data);
  });

const filterCountry = (data) => {
  const country = document.querySelector("#filter__item-country");
  console.log(country);
  country.innerHTML += `
    <option value> -- Quốc gia -- </option>
  `;
  data.filter((item) => {
    const codeItem = item.iso_3166_1;
    if (
      codeItem == "JP" ||
      codeItem == "CN" ||
      codeItem == "US" ||
      codeItem == "KR" ||
      codeItem == "GB" ||
      codeItem == "IN" ||
      codeItem == "TH" ||
      codeItem == "TW"
    ) {
      country.innerHTML += `
        <option value="${codeItem}">${item.native_name}</option>
      `;
    }
  });
};

const filterYear = () => {
  const year = document.querySelector("#filter__item-years");
  for (let i = 2023; i > 2011; i--) {
    if (i == 2023) {
      year.innerHTML += `
      <option value> -- Năm -- </option>
      `;
    } else if (i < 2023 && i > 2012) {
      year.innerHTML += `
       <option value="${i}">${i}</option>
      `;
    } else {
      year.innerHTML += `
       <option value="${i}">trước ${i}</option>
      `;
    }
  }
};

window.onload = () => {
  filterYear();
  navSearchDesktop();
  navSearchMobile();
};
