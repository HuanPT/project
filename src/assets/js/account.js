import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/search.css";
import "@assets/css/person.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";

import {
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  selectedHash,
  backToTop,
  loading,
} from "./common.js";

// const callApiMovies = async () => {
//   await renderFavorites();
//   await renderBookmarks();
// };

// const renderFavorites = async () => {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   const favoriteMovies = await Promise.all(
//     favorites.map(async (id) => {
//       const res = await fetch(
//         `${api.base_url}${id}?` +
//           new URLSearchParams({
//             api_key: api.api_key,
//           }) +
//           api.language
//       );
//       const data = await res.json();
//       return data;
//     })
//   );

//   favoriteMovies.forEach((movie) => {
//     makeCard(movie, "#nav__favorite-list");
//   });

//   const favoriteList = document.querySelector("#nav__favorite-list");
//   const removeButton = document.createElement("button");
//   removeButton.classList.add("btn", "btn-secondary", "btn__remove-list");

//   const btnRemove = favoriteList.querySelectorAll(".btn-remove");
//   console.log(btnRemove);
//   btnRemove.forEach((item) => {
//     item.addEventListener("click", () => {
//       const parent = item.closest(".card");
//       const id = parent.id;
//       console.log(parent, id);
//       let index = favorites.indexOf(id);
//       if (index > -1) {
//         favorites.splice(index, 1);
//       }
//       localStorage.setItem("favorites", JSON.stringify(favorites));
//       favoriteList.removeChild(parent);
//       if (favorites.length == 0) favoriteList.removeChild(removeButton);
//     });
//   });
//   removeButton.innerHTML = `
//     <i class="fa-regular fa-trash-can"></i>
//       Xóa tất cả
//   `;

//   console.log(favoriteList.firstChild);
//   removeButton.addEventListener("click", () => {
//     localStorage.removeItem("favorites");
//     while (favoriteList.firstChild) {
//       favoriteList.removeChild(favoriteList.firstChild);
//     }
//   });
//   if (favorites.length !== 0) favoriteList.appendChild(removeButton);
// };

// const renderBookmarks = async () => {
//   const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//   const bookmarkMovies = await Promise.all(
//     bookmarks.map(async (id) => {
//       const res = await fetch(
//         `${api.base_url}${id}?` +
//           new URLSearchParams({
//             api_key: api.api_key,
//           }) +
//           api.language
//       );
//       const data = await res.json();
//       return data;
//     })
//   );

//   bookmarkMovies.forEach((movie) => {
//     makeCard(movie, "#nav__bookmark-list");
//   });

//   const bookmarkList = document.querySelector("#nav__bookmark-list");
//   const removeButton = document.createElement("button");
//   removeButton.classList.add("btn", "btn-secondary", "btn__remove-list");

//   const btnRemove = bookmarkList.querySelectorAll(".btn-remove");
//   console.log(btnRemove);
//   btnRemove.forEach((item) => {
//     item.addEventListener("click", () => {
//       const parent = item.closest(".card");
//       const id = parent.id;
//       console.log(parent, id);
//       let index = bookmarks.indexOf(id);
//       if (index > -1) {
//         bookmarks.splice(index, 1);
//       }
//       localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//       bookmarkList.removeChild(parent);
//       if (bookmarks.length == 0) bookmarkList.removeChild(removeButton);
//     });
//   });

//   removeButton.innerHTML = `
//     <i class="fa-regular fa-trash-can"></i>
//       Xóa tất cả
//   `;

//   removeButton.addEventListener("click", () => {
//     localStorage.removeItem("bookmarks");
//     while (bookmarkList.firstChild) {
//       bookmarkList.removeChild(bookmarkList.firstChild);
//     }
//   });
//   if (bookmarks.length !== 0) bookmarkList.appendChild(removeButton);
// };

const callApiMovies = async () => {
  await renderFavorites();
  await renderBookmarks();
};

const renderList = async (storageKey, listId) => {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];
  const itemMovies = await Promise.all(
    items.map(async (id) => {
      const res = await fetch(
        `${api.base_url}${id}?` +
          new URLSearchParams({
            api_key: api.api_key,
          }) +
          api.language
      );
      const data = await res.json();
      return data;
    })
  );

  itemMovies.forEach((movie) => {
    makeCard(movie, listId);
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-secondary", "btn__remove-list");
  removeButton.innerHTML = `
    <i class="fa-regular fa-trash-can"></i>
      Xóa tất cả
  `;

  removeButton.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  });

  const list = document.querySelector(listId);
  if (items.length !== 0) list.appendChild(removeButton);

  const btnRemove = list.querySelectorAll(".btn-remove");
  btnRemove.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.closest(".card");
      const id = parent.id;
      let index = items.indexOf(id);
      if (index > -1) {
        items.splice(index, 1);
      }
      localStorage.setItem(storageKey, JSON.stringify(items));
      list.removeChild(parent);
      if (items.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = `Danh sách trống`;
        list.removeChild(removeButton);
        if (items.length === 0) {
          const p = document.createElement("p");
          p.innerHTML = `Danh sách trống!`;
          list.appendChild(p);
        }
      }
    });
  });
  if (items.length === 0) {
    const p = document.createElement("p");
    p.innerHTML = `Danh sách trống!`;
    list.appendChild(p);
  }
};

const renderFavorites = async () => {
  await renderList("favorites", "#nav__favorite-list");
};

const renderBookmarks = async () => {
  await renderList("bookmarks", "#nav__bookmark-list");
};

const makeCard = (data, listId) => {
  const list = document.querySelector(listId);
  const date = new Date(data.release_date);
  const localDate = date.toLocaleDateString("vi");

  const isOverview = () => {
    if (data.overview != "") {
      return data.overview;
    } else {
      return "Nội dung đang được cập nhật.";
    }
  };

  if (data.backdrop_path == null) {
    data.backdrop_path = data.poster_path;
    if (data.backdrop_path == null) {
      return;
    }
  }
  let genreHTML = "";
  data.genres.forEach((genre, i) => {
    if (i < 2)
      genreHTML += `<a href="./search.html?with_genres=${genre.id}" class="card__genres-text" id="${genre.id}">${genre.name}</a>`;
  });

  list.innerHTML += `
  <div class="card m-3" id="${data.id}">
    <div class="row g-0">
        <div class="col-4">
            <a href="./movie.html?${data.id}" title="${data.title}">
                <img src="${api.imgUrlW533}${data.backdrop_path}"
                    class="img-fluid rounded-start" alt="${data.title}">
            </a>
        </div>
        <div class="col-8">
            <div class="card-body">
                <div class="wrap">
                    <div class="card-title">
                        <a href="./movie.html?${data.id}">
                            <h2 title="${data.title}">${data.title}</h2>
                        </a>
                        <p class="release-date">Ngày phát hành: ${localDate}</p>
                    </div>
                    <p class="card-text">${isOverview()}</p>
                    <div class="d-none d-sm-flex">
                        ${genreHTML}
                    </div>
                </div>
                <button class="btn btn-secondary btn-remove" title="xóa">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    </div>
  </div>
  `;
};

window.onload = () => {
  callApiMovies();
  navSearchDesktop();
  navSearchMobile();
  navMobile();
  headerOnTop();
  selectedHash();
  loading();
};
