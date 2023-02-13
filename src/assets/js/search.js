import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/person.css";
import "@assets/css/search.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import {
  navSearchDesktop,
  navSearchMobile,
  backToTop,
  headerOnTop,
  getURLparams,
  loading,
} from "./common";

let countries = [
  {
    iso_3166_1: "US",
    native_name: "Hoa Kỳ",
  },
  {
    iso_3166_1: "GB",
    native_name: "Vương quốc Anh",
  },
  {
    iso_3166_1: "IN",
    native_name: "Ấn Độ",
  },
  {
    iso_3166_1: "CN",
    native_name: "Trung Quốc",
  },
  {
    iso_3166_1: "TH",
    native_name: "Thái Lan",
  },
  {
    iso_3166_1: "JP",
    native_name: "Nhật Bản",
  },
  {
    iso_3166_1: "TW",
    native_name: "Đài Loan",
  },
];

let page = 1;

let params = getURLparams();
console.log(typeof params);

let keyword = params.q;

let genresId = params.with_genres;

let getYear = params.primary_release_year;

let getCountry = params.with_origin_country;

const isQuery = "q" in params;
const isDay = "day" in params;
const isWeek = "week" in params;
const isLatest = "latest" in params;
const isGenres = "with_genres" in params;
const isYear = "primary_release_year" in params;
const isCountry = "with_origin_country" in params;

console.log(isGenres, isDay, isQuery, isWeek, isYear, isCountry);

const searchKeyword = () => {
  return fetch(
    api.searchMovie +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language +
      `&page=${page}&query=${keyword}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      renderListSearch(data);
    });
};

const searchTrendingDay = () => {
  return fetch(api.trendingDay + `&page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderListSearch(data);
    });
};

const searchTrendingWeek = () => {
  return fetch(api.trendingWeek + `&page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderListSearch(data);
    });
};

const searchLatest = () => {
  return fetch(api.popular + `&page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderListSearch(data);
    });
};

const searchGenresId = (genresId) => {
  return fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: genresId,
        page: page,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      renderListSearch(data);
    });
};

const searchYear = (getYear) => {
  return fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        page: page,
      }) +
      "&primary_release_year=" +
      getYear +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderListSearch(data);
    });
};

const searchCountry = () => {
  return fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.searchCountry +
      getCountry +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderListSearch(data);
    });
};

const keyWord = (data) => {
  const title = document.querySelector(".search__title");
  let country =
    countries.find((item) => item.iso_3166_1 === getCountry) || false;
  if (isQuery) {
    if (data.results == 0) {
      return (title.innerHTML = `Không có kết quả cho từ khóa: ${keyword}`);
    } else {
      return (title.innerHTML = `Từ khóa: ${keyword}`);
    }
  } else {
    if (isDay) {
      return (title.innerHTML = `Danh sách phim HOT hôm nay:`);
    }
    if (isGenres) {
      return (title.innerHTML = `Danh sách ${genresId.toLowerCase()}:`);
    }
    if (isWeek) {
      return (title.innerHTML = `Danh sách phim HOT tuần này:`);
    }
    if (isYear) {
      return (title.innerHTML = `Danh sách phim năm ${getYear}:`);
    }
    if (isCountry) {
      if (country)
        return (title.innerHTML = `Danh sách phim của ${country.native_name}:`);
      else return (title.innerHTML = `Danh sách phim của quốc gia khác:`);
    }
  }
};

const removeFilter = () => {
  const btnRemove = document.querySelector("#remove__filter");

  btnRemove.addEventListener("click", () => {
    location.replace("?day");
  });
};

const renderListSearch = (data) => {
  const items = data.results;
  const list = document.querySelector(".list__film");
  list.innerHTML = "";
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
  keyWord(data);
  configPrevBtn(data);
  configNextBtn(data);
};

const fetchFilterGenres = () => {
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
};

const listGenres = (data) => {
  const genres = document.querySelector("#filter__item-genres");
  genres.innerHTML += `
      <option value> -- Thể loại -- </option>
      `;
  data.genres.forEach((item, i) => {
    if (item.id == genresId) {
      genresId = item.name;
    }
    if (i <= 14) {
      if (item.id == genresId || genresId == item.name) {
        genres.innerHTML += `
        <option value="${item.id}" selected>${item.name}</option>
      `;
      } else {
        genres.innerHTML += `
        <option value="${item.id}">${item.name}</option>
        `;
      }
    }
  });
  genres.addEventListener("change", (e) => {
    console.log(e.target.value);
    console.log(e.target);
    window.location.replace(`?with_genres=${e.target.value}`);
  });
};

const listCountry = (data) => {
  const country = document.querySelector("#filter__item-country");

  country.innerHTML += `
    <option value> -- Quốc gia -- </option>
  `;
  data.forEach((item) => {
    let codeItem = item.iso_3166_1;

    console.log(item);
    if (codeItem == getCountry) {
      country.innerHTML += `
      <option value="${codeItem}" selected>${item.native_name}</option>
      `;
    } else {
      country.innerHTML += `
      <option value="${codeItem}">${item.native_name}</option>
    `;
    }
    country.addEventListener("change", (e) => {
      window.location.href = `./search.html?with_origin_country=${e.target.value}`;
    });
  });
};

const filterYear = () => {
  const year = document.querySelector("#filter__item-years");
  year.innerHTML += `
      <option value> -- Năm -- </option>
      `;
  for (let i = 2023; i > 2012; i--) {
    if (i > 2013) {
      if (getYear == i && getYear != "") {
        year.innerHTML += `
       <option value="${i}" selected>${i}</option>
      `;
      } else {
        year.innerHTML += `
         <option value="${i}">${i}</option>
        `;
      }
    } else {
      if (getYear <= i && getYear != "") {
        year.innerHTML += `
       <option value="${i}" selected>trước ${i + 1}</option>
      `;
      } else {
        year.innerHTML += `
       <option value="${i}">trước ${i + 1}</option>
      `;
      }
    }
  }
  year.addEventListener("change", (e) => {
    window.location.href = `./search.html?primary_release_year=${e.target.value}`;
  });
};

const checkSearch = () => {
  if (isQuery) return searchKeyword();
  if (isDay) return searchTrendingDay();
  if (isWeek) return searchTrendingWeek();
  if (isLatest) return searchLatest();
  if (isGenres) return searchGenresId(genresId);
  if (isYear) return searchYear(getYear);
  if (isCountry) return searchCountry(getCountry);
};

const prevBtn = () => {
  const currentPage = document.querySelector(".current-page");
  const prevBtn = document.querySelector(".previous-page");
  prevBtn.addEventListener("click", () => {
    page--;
    currentPage.innerHTML = page;
    backToTop();
    checkSearch();
  });
};

const nextBtn = () => {
  const currentPage = document.querySelector(".current-page");
  const nextBtn = document.querySelector(".next-page");
  nextBtn.addEventListener("click", () => {
    page++;
    currentPage.innerHTML = page;
    backToTop();
    checkSearch();
  });
};

const configNextBtn = (data) => {
  const prevBtn = document.querySelector(".previous-page");
  const parentPrevBtn = prevBtn.closest("li");
  const nextBtn = document.querySelector(".next-page");
  const parentNextBtn = nextBtn.closest("li");

  if (page > 1) {
    parentPrevBtn.classList.remove("disabled");
    parentPrevBtn.style.cursor = "pointer";
  }
  if (page == data.total_pages || data.total_pages <= 1) {
    parentNextBtn.classList.add("disabled");
    parentNextBtn.style.cursor = "no-drop";
  }
};

const configPrevBtn = (data) => {
  const prevBtn = document.querySelector(".previous-page");
  const parentPrevBtn = prevBtn.closest("li");
  const nextBtn = document.querySelector(".next-page");
  const parentNextBtn = nextBtn.closest("li");

  if (page == 1) {
    parentPrevBtn.classList.add("disabled");
    parentPrevBtn.style.cursor = "no-drop";
  }
  if (page < data.total_pages) {
    parentNextBtn.classList.remove("disabled");
    parentNextBtn.style.cursor = "pointer";
  }
};

const pagination = () => {
  prevBtn();
  nextBtn();
};

window.onload = () => {
  listCountry(countries);
  fetchFilterGenres();
  checkSearch();
  pagination();
  filterYear();
  navSearchDesktop();
  navSearchMobile();
  headerOnTop();
  removeFilter();
  loading();
};
