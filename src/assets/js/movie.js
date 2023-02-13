import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/search.css";
import "@assets/css/person.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import * as customCarousel from "./customCarousel.js";

import {
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  loading,
} from "./common.js";

let movieId = location.search.replace("?", "");
console.log(movieId);

const formatString = (currentIndex, maxIndex) => {
  return currentIndex == maxIndex - 1 ? "" : ", ";
};

const callApiMovie = (movieId) => {
  fetch(
    `${api.base_url}${movieId}?` +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      setupMovieInfo(data, movieId);
    })
    .catch((err) => console.log("err"));
};

const setupMovieInfo = (data, movieId) => {
  const title = document.querySelector("title");
  title.innerHTML = data.title;
  createImgBig(data);
  createImgSmall(data);
  movieName(data);
  movieInfo(data);
  iconPlay(data);
  favorite(movieId);
  bookmark(movieId);
};

const createImgSmall = (data) => {
  const filmImgSmall = document.querySelector(".img__small");
  const imgSmall = document.createElement("img");
  imgSmall.src = `${api.imgUrlW342}${data.poster_path}`;
  imgSmall.alt = `${data.title}`;

  filmImgSmall.append(imgSmall);
};

const createImgBig = (data) => {
  const filmImgBig = document.querySelector(".img__big");
  const imgBig = document.createElement("img");
  let img = data.backdrop_path == null ? data.poster_path : data.backdrop_path;
  imgBig.src = `${api.imgOriginalUrl}${img}`;
  imgBig.alt = `${data.title}`;

  filmImgBig.append(imgBig);
};

const movieName = (data) => {
  const movieName = document.querySelector(".film__info-text");

  const NameH1 = document.createElement("h1");
  NameH1.innerHTML = data.title;
  const NameH2 = document.createElement("h2");
  NameH2.innerHTML = data.original_title;

  const listButton = document.createElement("ul");
  listButton.classList.add("list__button");

  listButton.innerHTML = `
                    <li>
                      <a href="./watch.html" class="btn btn-red">
                        <i class="fa-regular fa-circle-play"></i>
                        Xem Phim
                      </a>
                    </li>
                    <li>
                      <div class="addTo__account favorite">
                        <div class="addTo__account-wrap">
                          <span>
                            <i class="fa-regular fa-heart"></i>
                          </span>
                          <span class="add__favorite d-none">
                            <i class="fa-solid fa-heart"></i>
                          </span>
                        </div>
                        <div class="addTo__account-des">
                          <div class="triangle"></div>
                          <div class="des">Thêm vào yêu thích</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="addTo__account bookmark">
                        <div class="addTo__account-wrap">
                          <span>
                            <i class="fa-regular fa-bookmark"></i>
                          </span>
                          <span class="add__bookmark d-none">
                            <i class="fa-solid fa-bookmark"></i>
                          </span>
                        </div>
                        <div class="addTo__account-des">
                          <div class="triangle"></div>
                          <div class="des">Thêm vào danh sách xem</div>
                        </div>
                      </div>
                    </li>
    `;
  movieName.append(NameH1, NameH2, listButton);
};

const iconPlay = (data) => {
  const filmInfo = document.querySelector(".film__info-img");
  console.log(filmInfo);
  const a = document.createElement("a");
  a.href = `./watch.html?${data.id}`;
  a.classList.add("icon-play", "d-none", "d-sm-block");
  a.innerHTML = `<i class="fa-solid fa-play"></i>`;
  filmInfo.appendChild(a);
};

const movieInfo = (data) => {
  infoRelease(data);
  infoGenres(data);
  infoCountry(data);
  imdb(data);
  runtime(data);
  overview(data);
};

const infoRelease = (data) => {
  const release = document.querySelector(".release");
  let year = data.release_date.split("-")[0];
  release.innerHTML = year;
  release.href = `./search.html?primary_release_year=${year}&page=1`;
};

const infoGenres = (data) => {
  const genresDiv = document.querySelector(".genres");
  let length = data.genres.length;
  for (let i = 0; i < length; i++) {
    genresDiv.innerHTML += `
        <a href="/search.html?with_genres=${data.genres[i].id}&page=1">${
      data.genres[i].name
    }</a>${formatString(i, length)}
    `;
  }
};

const infoCountry = (data) => {
  const genresDiv = document.querySelector(".countries");
  console.log(data);
  let length = data.production_countries.length;
  for (let i = 0; i < length; i++) {
    genresDiv.innerHTML += `
        <a href="/search.html?with_origin_country=${
          data.production_countries[i].iso_3166_1
        }">${data.production_countries[i].name}</a>${formatString(i, length)}
    `;
  }
};

const imdb = (data) => {
  const imdb = document.querySelector(".imdb");
  const point = data.vote_average.toFixed(1);
  imdb.innerHTML = point;

  if (point < 4) imdb.style.background = "#571435";
  else if (point >= 4 && point < 7) imdb.style.background = "#e3b71e";
  else imdb.style.background = "#21d07a";
};

const runtime = (data) => {
  const time = document.querySelector(".runtime");
  const allTime = data.runtime;
  time.innerHTML =
    Math.floor(allTime / 60) + " giờ " + (allTime % 60) + " phút";
};

// fetch cast & editor
const callApiCast = () => {
  fetch(
    `${api.base_url}${movieId}/credits?` +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      editor(data);
      cast(data);
    });
};

const editor = (data) => {
  const editor = document.querySelector(".editor");

  const crew = data.crew;
  const editors = crew.filter((item) => {
    return item.job == "Editor";
  });

  length = editors.length;
  if (length == 0) editor.innerHTML += "Đang xác minh";
  for (let i = 0; i < length; i++) {
    editor.innerHTML += `
      <a href="./search.html?q=${editors[i].name}">${
      editors[i].name
    }</a>${formatString(i, length)}
    `;
  }
};

const cast = (data) => {
  const cast = document.querySelector(".cast");
  const actor = data.cast;
  const len = actor.length;

  if (len == 0) {
    cast.style.justifyContent = "flex-start";
    return (cast.innerHTML = `
      Diễn viên đang được cập nhật.
    `);
  } else {
    if (len < 10) {
      for (let i = 0; i < len; i++) {
        if (actor[i].profile_path !== null) {
          cast.innerHTML += `
      <a href="./person.html?${actor[i].id}" class="actor">
        <div class="actor__img">
          <img src="${api.imgProfileW185}${actor[i].profile_path}" alt="${actor[i].name}">
        </div>
        <div class="actor__name">
          <p>${actor[i].name}</p>
        </div>
      </a>
    `;
        }
      }
    } else {
      for (let i = 0; i < 10; i++) {
        if (actor[i].profile_path !== null) {
          cast.innerHTML += `
      <a href="./person.html?${actor[i].id}" class="actor">
        <div class="actor__img">
          <img src="${api.imgProfileW185}${actor[i].profile_path}" alt="${actor[i].name}">
        </div>
        <div class="actor__name">
          <p>${actor[i].name}</p>
        </div>
      </a>
    `;
        }
      }
    }
  }
};

const overview = (data) => {
  const overview = document.querySelector(".overview");
  const detailOverview = (data) => {
    let detailOverview = data.overview;
    if (detailOverview == "")
      detailOverview = "Nội dung sẽ được cập nhật trong thời gian sớm nhất.";
    return detailOverview;
  };

  const p = document.createElement("p");
  p.innerHTML = `
  <b>${data.original_title}</b>. ${detailOverview(data)}
  `;
  overview.append(p);
};

// fetch trailer
const callApiTrailer = () => {
  fetch(
    `${api.base_url}${movieId}/videos?` +
      new URLSearchParams({
        api_key: api.api_key,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const wrapIframe = document.querySelector(".wrap-iframes");
      const item = document.createElement("div");

      let maxTrailer = data.results.length > 4 ? 4 : data.results.length;
      item.classList.add("item");
      if (maxTrailer == 0) {
        const overview = document.createElement("div");
        overview.classList.add("overview");
        wrapIframe.appendChild(overview);
        return (overview.innerHTML = `
        <p>Trailer sẽ được cập nhật trong thời gian sớm nhất.</p>
      `);
      }
      for (let i = 0; i < maxTrailer; i++) {
        item.innerHTML += `
      <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
      </iframe>

    `;
      }
      wrapIframe.append(item);
    });
};
// fetch recommendations
const recommendations = () => {
  fetch(
    `${api.base_url}${movieId}/recommendations?` +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".recommendations-container");
      const result = data.results;
      const slide = document.createElement("div");
      slide.classList.add("owl-carousel", "owl-theme", "nominated-slide");
      const length = result.length;
      if (length == 0) {
        const overview = document.createElement("div");
        overview.classList.add("overview");

        container.appendChild(overview);
        overview.innerHTML = `
        <p>Chưa có đề xuất cho bạn.</p>
      `;
      } else if (length < 10) {
        for (let i = 0; i < length; i++) {
          if (result[i].backdrop_path !== null) {
            slide.innerHTML += `
          <div class="item">
            <div class="card__movie">
              <a href="/movie.html?${result[i].id}">
                <img src="${api.imgUrlW533}${result[i].backdrop_path}" alt="${result[i].title}">
                <p class="movie-title">${result[i].title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
          }
        }
      } else {
        for (let i = 0; i < 10; i++) {
          if (result[i].backdrop_path !== null) {
            slide.innerHTML += `
          <div class="item">
            <div class="card__movie">
              <a href="/movie.html?${result[i].id}">
                <img src="${api.imgUrlW533}${result[i].backdrop_path}" alt="${result[i].title}">
                <p class="movie-title">${result[i].title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
          }
        }
      }
      container.append(slide);
      customCarousel.carousel(data);
    });
};

const favorite = (movieId) => {
  const favoriteBtn = document.querySelector(".favorite");
  const addFavorite = favoriteBtn.querySelector(".add__favorite");
  const des = favoriteBtn.querySelector(".des");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const toggleFavorite = () => {
    addFavorite.classList.toggle("d-none");
    let isFavorite = !addFavorite.classList.contains("d-none");

    if (isFavorite) {
      des.innerHTML = "Xóa khỏi yêu thích";
      favorites.push(movieId);
    } else {
      des.innerHTML = "Thêm vào yêu thích";
      let index = favorites.indexOf(movieId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (favorites.includes(movieId)) {
    addFavorite.classList.remove("d-none");
    des.innerHTML = "Xóa khỏi yêu thích";
  } else {
    addFavorite.classList.add("d-none");
  }

  favoriteBtn.addEventListener("click", toggleFavorite);
};

const bookmark = (movieId) => {
  const bookmarkBtn = document.querySelector(".bookmark");
  const addBookmark = bookmarkBtn.querySelector(".add__bookmark");
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const des = bookmarkBtn.querySelector(".des");

  const toggleBookmark = () => {
    addBookmark.classList.toggle("d-none");
    let isBookmark = !addBookmark.classList.contains("d-none");

    if (isBookmark) {
      des.innerHTML = "Xóa khỏi danh sách xem";
      bookmarks.push(movieId);
    } else {
      des.innerHTML = "Thêm vào danh sách xem";
      let index = bookmarks.indexOf(movieId);
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  if (bookmarks.includes(movieId)) {
    addBookmark.classList.remove("d-none");
    des.innerHTML = "Xóa khỏi danh sách xem";
  } else {
    addBookmark.classList.add("d-none");
  }

  bookmarkBtn.addEventListener("click", toggleBookmark);
};

window.onload = () => {
  callApiMovie(movieId);
  navSearchDesktop();
  navSearchMobile();
  navMobile();
  callApiCast();
  headerOnTop();
  callApiTrailer();
  loading();
  recommendations();
};
