import * as customCarousel from "./customCarousel.js";
import * as api from "./api.js";

import { auth, db } from "./firebase.js";
import { getDocs, collection, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const MIN_LENGTH_PASS = 6;

export const navSearchDesktop = () => {
  const inputDesktop = document.querySelector("#search__desktop");
  // console.log(inputDesktop);
  inputDesktop.addEventListener("change", (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    // console.log(e.keycode);
    if (e.target.value !== "") {
      window.location.href = `./search.html?q=${e.target.value}`;
    }
  });
};

export const navSearchMobile = () => {
  const inputMobile = document.querySelector("#search__mobile");
  inputMobile.addEventListener("blur", (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    if (e.target.value !== "") {
      window.location.href = `./search.html?q=${e.target.value}`;
    }
  });
};

export const navMobile = () => {
  const btnNav = document.querySelector(".btn__navbars");
  const nav = document.querySelector(".navbars__mobile-detail");
  const overlay = nav.querySelector(".overlay");
  btnNav.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    document.body.style.overflow = "hidden";
  });
  overlay.addEventListener("click", () => {
    nav.classList.add("hidden");
    document.body.style.overflow = "";
  });
};

export function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export const loading = (s) => {
  document.querySelector(".loading").style.display = "block";
  setTimeout(
    () => {
      document.querySelector(".loading").style.display = "none";
    },
    s ? s * 1000 : 1000
  );
};

export function headerOnTop() {
  const header = document.querySelector("header");
  let height = 0,
    currentHeight;

  window.addEventListener("scroll", () => {
    currentHeight = document.documentElement.scrollTop;
    if (height < currentHeight) {
      header.style.top = "-70px";
      height = currentHeight;
    } else {
      header.style.top = "0";

      currentHeight == 80
        ? (header.style.background = "transparent")
        : (header.style.background = "#131313");

      height = currentHeight;
    }
    if (currentHeight == 0) {
      header.style.top = "0";
      header.style.background = "transparent";
    }
  });
}

export function backGoToTop() {
  const btnBackToTop = document.querySelector("#back__to-top");
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 600) {
      btnBackToTop.style.opacity = 0.6;
      btnBackToTop.style.transform = "translateY(0)";
    } else {
      btnBackToTop.style.opacity = 0;
      btnBackToTop.style.transform = "translateY(5rem)";
    }
  });
  btnBackToTop.addEventListener("click", () => {
    backToTop();
  });
}

export function getURLparams() {
  let params = {};
  let query = location.search.substring(1);
  // console.log(query);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair.length === 1) {
      params[pair[0]] = "";
    } else {
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
  }
  return params;
}

export const selectedHash = () => {
  let hash = location.hash.substring(1);
  // console.log(hash);
  const getHash = document.getElementById(hash);
  getHash.click();
  backToTop();
};

export const toggleShowPass = () => {
  const has = document.querySelectorAll(".has__password-toggle");

  has.forEach((item) => {
    const toggle = item.querySelector(".btn__password-toggle");
    const input = item.querySelector("input");
    const txtErr = item.nextElementSibling;
    hasText();

    input.addEventListener("focus", (e) => {
      e.preventDefault();
      toggle.classList.toggle("d-none");
    });

    input.addEventListener("change", (e) => {
      e.preventDefault();
      const length = e.target.value.trim().length;
      if (length < MIN_LENGTH_PASS) {
        input.style.border = "0.2rem solid #e87c03";
        txtErr.innerText = `Mật khẩu phải có độ dài ít nhất ${MIN_LENGTH_PASS} ký tự.`;
      } else {
        input.style.border = "";
        txtErr.innerText = "";
      }
    });

    input.addEventListener("blur", (e) => {
      e.preventDefault();
      if (!e.target.value.trim()) {
        e.target.value = "";
        input.style.border = "";
        txtErr.innerText = "";
      }
    });

    toggle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      toggle.innerText == "Hiện"
        ? setTimeout(() => {
            toggle.innerText = "Ẩn";
            input.type = "text";
            input.focus();
          }, 100)
        : toggle.innerText == "Ẩn"
        ? setTimeout(() => {
            toggle.innerText = "Hiện";
            input.type = "password";
            input.focus();
          }, 100)
        : undefined;
    });

    input.addEventListener("blur", (e) => {
      e.preventDefault();
      toggle.innerText = "Hiện";
      input.type = "password";
      toggle.classList.toggle("d-none");
    });
  });
};

export const hasText = () => {
  const input = document.querySelectorAll(".input-tag");

  input.forEach((item) => {
    const parent = item.closest(".label__input");

    if (item.value) parent.classList.add("has-txt");

    item.addEventListener("change", (e) => {
      if (e.target.value) parent.classList.add("has-txt");
      else parent.classList.remove("has-txt");
    });
  });
};

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.querySelector("#toast");
  if (!main) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", "show", `toast--${type}`);
  toast.style.animation = `slideDropDown ease 0.3s, fadeOut linear 1s ${(
    duration / 1000
  ).toFixed(2)}s forwards`;

  const icons = {
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
    warning: "fa-sharp fa-solid fa-circle-exclamation",
    error: "fa-solid fa-triangle-exclamation",
  };

  toast.innerHTML = `
    <div class="toast__icon">
      <i class="${icons[type]}"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  const autoRemoveId = setTimeout(() => {
    main.removeChild(toast);
  }, duration + 1000);

  toast.addEventListener("click", (e) => {
    if (e.target.closest(".toast__close")) {
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    }
  });

  main.appendChild(toast);
}

export function showErrorToast(title, message) {
  toast({
    title: title ? `${title}` : "Lỗi!",
    message: message ? `${message}` : "",
    type: "error",
    duration: 3000, //bao lâu thì ẩn đi 3s
  });
}

export function showSuccessToast(title, message) {
  toast({
    title: title ? `${title}` : "Thành công!",
    message: message ? `${message}` : "",
    type: "success",
    duration: 3000, //bao lâu thì ẩn đi 3s
  });
}

export function showInfoToast(title, message) {
  toast({
    title: title ? `${title}` : "Thông tin!",
    message: message ? `${message}` : "",
    type: "info",
    duration: 3000, //bao lâu thì ẩn đi 3s
  });
}

export function showWarningToast(title, message) {
  toast({
    title: title ? `${title}` : "Cảnh báo!",
    message: message ? `${message}` : "",
    type: "warning",
    duration: 3000, //bao lâu thì ẩn đi 3s
  });
}

// export function isEmail(value, message) {
//   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return regex.test(value) ? undefined : message || "Trường này phải là email";
// }

export function isEmailValid(value) {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(value);
}

export const getUser = () => {
  const userName = document.querySelector(".mobile__user-name");
  const hasUserM = document.querySelector(".header__navbars");
  const hasUserD = document.querySelector(".header__nav-user");
  const notUsers = document.querySelectorAll(".header__login");
  auth.onAuthStateChanged((user) => {
    // console.log(user);
    if (user !== null) {
      notUsers.forEach((item) => {
        item.style.display = "none";
      });
      hasUserM.style.display = "block";
      hasUserD.classList.add("d-flex");
      userName.innerHTML = `<h3>Chào ${user.displayName}!</h3>`;
      const btnLogouts = document.querySelectorAll(".logout");
      btnLogouts.forEach((item) => {
        // console.log(item);
        item.addEventListener("click", (e) => {
          e.preventDefault();
          signOut(auth)
            .then(() => {
              setTimeout(() => {
                location.href = "/";
              }, 200);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } else {
      notUsers.forEach((item) => {
        item.style.display = "block";
      });
      hasUserM.style.display = "none";
      hasUserD.classList.remove("d-flex");
    }
  });
};

export const loginBtn = () => {
  const btns = document.querySelectorAll(".header__login");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/#login";
    });
  });
};

// fetch recommendations
export const recommendations = (id, keyWord) => {
  return fetch(
    `${api.base_url}${id}/${keyWord}?` +
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
