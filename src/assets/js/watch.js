// import "@assets/css/index.css";
import "@assets/css/watch.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";
import "@lib/Owlcarousel2/owl.carousel.min.js";

import { auth, db } from "./firebase";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  arrayRemove,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import {
  loading,
  getUser,
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  loginBtn,
  recommendations,
} from "./common";
import * as api from "./api.js";

let getId = location.search.replace("?", "");
console.log(getId);

const history = (getId) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return;
    } else {
      const userId = user.uid;
      const addToHistory = (userId, getId) => {
        const historyRef = doc(db, "users", userId);
        getDoc(historyRef).then((doc) => {
          if (doc.exists()) {
            updateDoc(historyRef, {
              history: arrayUnion(getId),
            });
          } else {
            setDoc(
              historyRef,
              {
                history: [getId],
              },
              {
                merge: true,
              }
            ).then(() => {
              history.push(getId);
            });
          }
        });
      };
      addToHistory(userId, getId);
    }
  });
};

const filmInfo = (id) => {
  return fetch(
    `${api.base_url}${id}?` +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const filmName = document.querySelector(".film__info-text");
      filmName.innerHTML = `
      
      <h1 style="color:var(--gray-color)">${data.title}</h1>
      <h2 style="color:var(--text-gray)">${data.original_title}</h2>
      <h5 style="color:var(--text-gray)">Nội dung: <span style="color:var(--text-gray)">${data.overview}</span></h5>
      `;
    })
    .catch((err) => {
      console.log(err);
    });
};

const controller = () => {
  navSearchDesktop();
  navSearchMobile();
  navMobile();
  headerOnTop();
  loginBtn();
  history(getId);
  filmInfo(getId);
  recommendations(getId, "recommendations");
};

window.addEventListener("load", () => {
  loading();
  getUser();
  controller();
});
