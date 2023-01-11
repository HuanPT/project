import "@lib/Owlcarousel2/assets/owl.carousel.min.css";
import "@lib/Owlcarousel2/assets/owl.theme.default.min.css";
import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/search.css";
import "@assets/css/person.css";

import "@assets/css/responsiveIndex.css";

import "@lib/jquery-3.6.1.min.js";
import "@lib/Owlcarousel2/owl.carousel.min.js";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import * as customCarousel from "./customCarousel.js";

let movieId = location.search.replace("?", "");
console.log(movieId);

fetch(
  `${api.base_url}${movieId}?` +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setupMovieInfo(data)
  });

  const setupMovieInfo = (data) => {
    console.log(data.backdrop_path);
    const title = document.querySelector("title")
    const filmImgBig = document.querySelector('.img__big')
    filmImgBig.innerHTML += `
        <img src="${api.imgOriginalUrl}${data.backdrop_path}" alt="${data.title}">
    `;
  }
