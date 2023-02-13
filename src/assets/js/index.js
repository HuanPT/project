import "@assets/css/index.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as common from "./common";

import { getDocs, collection } from "firebase/firestore";

import { auth, db } from "./firebase";
import { isEmailValid, loading, headerOnTop } from "./common";

import {
  updateProfile,
  updateCurrentUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// const productCollection = collection(db, "products");

// const products = await getDocs(productCollection);

// console.log(products.docs.map((item) => ({

// })));

const body = document.body;
const btn = document.querySelector(".header__login");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const formList = document.querySelector(".form__list");
const formLogin = document.querySelector(".login__form");
const formForget = document.querySelector(".forget__form");
const formConfirm = document.querySelector(".confirm__form");
const listFormEmail = document.querySelectorAll(".email__form");
const createPassword = document.querySelector(".createPassword__form");
const successPassword = document.querySelector(".successPassword__form");

const inputEmail = () => {
  const input = document.querySelectorAll(".input-tag");
  input.forEach((item) => {
    if (item.type == "email") {
      item.addEventListener("change", (e) => {});
    }
  });
};

const hasText = () => {
  const input = document.querySelectorAll(".input-tag");

  input.forEach((item) => {
    const parent = item.closest(".label__input");

    if (item.value !== "") parent.classList.add("has-txt");

    item.addEventListener("change", (e) => {
      if (e.target.value !== "") parent.classList.add("has-txt");
      else parent.classList.remove("has-txt");
    });
  });
};

const faqQuestions = () => {
  const toggles = document.querySelectorAll(".faq-question");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const child = toggle.querySelector(".icon-plus");

      const answer = toggle.nextElementSibling;

      // check icon & answers
      const isRotateIcon = child.classList.contains("rotate-icon");
      const isOpenAnswers = answer.classList.contains("open-answers");

      // loop remove classList
      toggles.forEach((toggle) => {
        const child = toggle.querySelector(".icon-plus");
        const answer = toggle.nextElementSibling;
        child.classList.remove("rotate-icon");
        answer.classList.remove("open-answers");
      });

      // toggle if !check
      child.classList.toggle("rotate-icon", !isRotateIcon);
      answer.classList.toggle("open-answers", !isOpenAnswers);
    });
  });
};

const btnLogin = () => {
  btn.addEventListener("click", () => {
    login.classList.remove("d-none");
    formLogin.classList.remove("d-none");
    body.style.overflow = "hidden";
  });
};

const closeBtn = () => {
  const closes = document.querySelectorAll(".close-btn");
  const formChildren = formList.querySelectorAll(".form__item");
  closes.forEach((item) => {
    const parent = item.closest(".form");
    item.addEventListener("click", () => {
      parent.classList.add("d-none");
      body.style.overflow = "";
      formChildren.forEach((child) => {
        child.classList.add("d-none");
      });
    });
  });
};

const btnHelp = () => {
  const help = document.querySelector(".help-link");
  help.addEventListener("click", () => {
    formLogin.classList.add("d-none");
    formLogin.nextElementSibling.classList.toggle("d-none");
  });
};

const registerNow = () => {
  const registerNow = document.querySelector(".register__now");
  const formChildren = formList.querySelectorAll(".form__item");

  registerNow.addEventListener("click", () => {
    login.classList.add("d-none");
    register.classList.remove("d-none");
    document.body.style.overflow = "hidden";
    formChildren.forEach((child) => {
      child.classList.add("d-none");
    });
  });
};

const loginNow = () => {
  const loginNow = document.querySelector(".login__now");
  loginNow.addEventListener("click", () => {
    register.classList.add("d-none");
    login.classList.remove("d-none");
    formList.firstElementChild.classList.remove("d-none");
  });
};

const btns = () => {
  downloadApp();
  btnHelp();
  closeBtn();
  registerEmailInput();
  registerNow();
  btnLogin();
  loginNow();
  registerForm();
  loginForm();
};

const registerEmailInput = () => {
  listFormEmail.forEach((item) => {
    const textErr = item.querySelector(".input-error");
    const input = item.querySelector(".input-tag");
    const btn = item.querySelector("button");

    input.addEventListener("change", (e) => {
      e.preventDefault();
      const value = e.target.value;
      if (value) {
        if (isEmailValid(value)) {
          input.style.border = "0";
          textErr.innerHTML = "";
        } else {
          input.style.border = ".2rem solid #e87c03";
          textErr.innerHTML = "Bạn cần nhập Email!";
        }
      } else {
        input.style.border = "0";
        textErr.innerHTML = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        btn.click();
      }
    });

    input.addEventListener("blur", (e) => {
      const value = e.target.value;
      if (value == "") {
        input.style.border = "0";
        textErr.innerHTML = "";
      }
    });

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const value = input.value;
      if (value !== "" && isEmailValid(value)) {
        const turnOnRegister = document.querySelector(".register__now");
        const registerEmail = register.querySelector("#create__email");
        registerEmail.value = value;
        input.style.border = "0";
        textErr.innerHTML = "";
        console.log(value);
        turnOnRegister.click();
        hasText();
      } else {
        input.style.border = ".2rem solid #e87c03";
        textErr.innerHTML = "Bạn cần nhập Email!";
        input.focus();
        common.showWarningToast("", "Bạn cần nhập email!");
      }
    });
  });
};

// const registerForm = () => {
//   const register = document.querySelector(".register__form");
//   register.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const fullName = register.querySelector("#full__name").value;
//     const email = register.querySelector("#create__email").value;
//     const pass = register.querySelector("#create__password").value;
//     createUserWithEmailAndPassword(auth, email, pass)
//       .then((UserCredential) => {
//         auth.currentUser.displayName = fullName;
//         console.log(UserCredential.user);
//         console.log(UserCredential.user.metadata.creationTime);
//       })
//       .then(() => {
//         common.showSuccessToast("Đăng ký thành công!");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   });
// };

const registerForm = () => {
  const register = document.querySelector(".register__form");
  register.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = register.querySelector("#full__name").value;
    const email = register.querySelector("#create__email").value;
    const pass = register.querySelector("#create__password").value;
    createUserWithEmailAndPassword(auth, email, pass)
      .then((UserCredential) => {
        loading();
        UserCredential.user.updateEmail({ displayName: fullName });
        console.log(UserCredential.user);
        console.log(UserCredential.user.metadata.creationTime);
      })
      .then(() => {
        common.showSuccessToast("Đăng ký thành công!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          common.showErrorToast("", "Email đã tồn tại!");
        }
      });
  });
};

const loginForm = () => {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = formLogin.querySelector(".email__login").value;
    const pass = formLogin.querySelector(".password__login").value;
    console.log(email, pass);
    signInWithEmailAndPassword(auth, email, pass).then((UserCredential) => {});
  });
};

// const registerEmailInput = () => {
//   listFormEmail.forEach((item) => {
//     const textErr = item.querySelector(".input-error");
//     const input = item.querySelector(".input-tag");
//     const btn = item.querySelector("button");

//     const validateInput = (value) => {
//       if (!value) {
//         input.style.border = "0";
//         textErr.innerHTML = "";
//         return;
//       }
//       if (!isEmailValid(value)) {
//         input.style.border = ".2rem solid #e87c03";
//         textErr.innerHTML = "Bạn cần nhập Email!";
//         return;
//       }
//       input.style.border = "0";
//       textErr.innerHTML = "";
//       console.log(value);
//     };

//     input.addEventListener("change", (e) => {
//       e.preventDefault();
//       validateInput(e.target.value);
//     });

//     input.addEventListener("keydown", (e) => {
//       if (e.keyCode === 13) {
//         e.preventDefault();
//         btn.click();
//       }
//     });

//     input.addEventListener("blur", (e) => {
//       validateInput(e.target.value);
//     });

//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       console.log(validateInput(input.value));
//     });
//   });
// };

const downloadApp = () => {
  const btnDownload = document.querySelector(".btn__down-app");
  btnDownload.addEventListener("click", () => {
    common.showInfoToast("", "App đang trong quá trình hoàn thiện!");
  });
};

window.addEventListener("load", () => {
  btns();
  hasText();
  loading(0.2);
  inputEmail();
  headerOnTop();
  faqQuestions();
});
