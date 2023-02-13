// import "@lib/Owlcarousel2/assets/owl.carousel.min.css";
// import "@lib/Owlcarousel2/assets/owl.theme.default.min.css";
import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/person.css";
import "@assets/css/search.css";
// import "@assets/css/responsiveIndex.css";

// import "@lib/jquery-3.6.1.min.js";
// import "@lib/Owlcarousel2/owl.carousel.min.js";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import {
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  loading,
} from "./common";

let personId = location.search.replace("?", "");
// console.log(movieId);

// console.log(movieId);
fetch(
  `${api.person}${personId}?` +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listInfo(data);
    avatar(data);
    personName(data);
  });

const listInfo = (data) => {
  const list = document.querySelector(".person__info-list");
  const items = list.querySelectorAll("dd");

  let convertGender = (data) => {
    let gender = "";
    if (data == 1) {
      gender = "Nữ";
    } else gender = "Nam";
    return gender;
  };

  const birth = new Date(data.birthday).toLocaleDateString("Vi", {
    day: "2-digit", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "2-digit", // numeric, 2-digit, long, short, narrow
  });

  items.forEach((item, i) => {
    switch (i) {
      case 1:
        item.innerHTML = convertGender(data.gender);
        break;
      case 2:
        item.innerHTML = birth;
        break;
      case 3:
        item.innerHTML = data.place_of_birth;
    }
  });
};

const avatar = (data) => {
  const avatar = document.querySelector(".avatar");
  avatar.innerHTML += `
    <img src="${api.imgProfileH632}${data.profile_path}" alt="avatar">
 `;
};

const personName = (data) => {
  const person = document.querySelector(".actor__story");
  const bio =
    data.biography == ""
      ? "Chúng tôi chưa có tiểu sử cho " + data.name
      : data.biography;
  person.innerHTML += `
        <h1>${data.name}</h1>
        <h3 class="mt-4">Tiểu sử</h3>
        <p>${bio}</p>
    `;
};

// get Movie Credits
fetch(
  `${api.person}${personId}/movie_credits?` +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    cardMovie(data);
  });

const cardMovie = (data) => {
  console.log(data.cast);
  const listCast = data.cast;
  const ul = document.querySelector(".list__film");
  // console.log(ul);
  for (let i = 0; i < 16; i++) {
    if (
      listCast[i].backdrop_path !== null &&
      listCast[i].poster_path !== null
    ) {
      ul.innerHTML += `
        <li class="card__movie">
            <a href="./movie.html?${listCast[i].id}" title="${listCast[i].title}" class="d-block d-md-none">
                <img src="${api.imgUrlW533}${listCast[i].backdrop_path}"
                    alt="${listCast[i].title}">
                <p class="movie-title">${listCast[i].title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
            <a href="./movie.html?${listCast[i].id}" title="${listCast[i].title}" class="d-none d-md-block">
                <img src="${api.imgUrlW220}${listCast[i].poster_path}"
                    alt="${listCast[i].title}">
                <p class="movie-title">${listCast[i].title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
        </li>
      `;
    }
  }
};

window.onload = () => {
  navSearchDesktop();
  navSearchMobile();
  headerOnTop();
  navMobile();
  loading();
};
