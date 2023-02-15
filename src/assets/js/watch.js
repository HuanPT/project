// import "@assets/css/index.css";
import "@assets/css/watch.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import {
  loading,
  getUser,
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
} from "./common";
import * as api from "./api.js";
import * as customCarousel from "./customCarousel.js";

const controller = () => {
  navSearchDesktop();
  navSearchMobile();
  navMobile();
  headerOnTop();
};

window.addEventListener("load", () => {
  loading();
  getUser();
  controller();
});
