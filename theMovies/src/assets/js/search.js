import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/person.css";
import "@assets/css/search.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import { navSearchDesktop, navSearchMobile } from "./common";
import "@assets/css/responsiveIndex.css";

let keyword = location.search.replace("?q=", "");

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
  items.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    list.innerHTML += `
        <li class="card__movie">
            <a href="./movie.html?${item.id}" class="d-block d-md-none">
                <img src="${api.imgUrlW533}${item.backdrop_path}"
                    alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
            <a href="./movie.html?${item.id}" class="d-none d-md-block">
                <img src="${api.imgUrlW220}${item.poster_path}" alt="">
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
