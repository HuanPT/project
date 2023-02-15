import "@assets/css/index.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as common from "./common";

import { getDocs, collection, doc } from "firebase/firestore";

import { auth, db } from "./firebase";
import { isEmailValid, loading, headerOnTop } from "./common";

import {
  updateProfile,
  updateCurrentUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { async } from "@firebase/util";

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
const MIN_LENGTH_PASS = 6;

const tagInput = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    const email = input.name == "email";
    const name = input.name == "fullName";
    const remember = input.id == "remember";
    const parent = input.parentElement;
    const txtErr = parent.nextElementSibling;

    if (remember) {
      const form = parent.closest(".login__form");
      const email = form.querySelector(".email__login");
      const pass = form.querySelector(".password__login");
      const btnLogin = form.querySelector(".login__btn");

      if (localStorage.checkbox && localStorage.checkbox != "") {
        input.setAttribute("checked", "checked");
        email.value = localStorage.email;
        pass.value = localStorage.pass;
      } else {
        input.removeAttribute("checked");
        email.value = "";
        pass.value = "";
      }

      const isRemember = () => {
        if (input.checked && email.value != "" && pass.value != "") {
          localStorage.checkbox = input.checked;
          localStorage.pass = pass.value;
          localStorage.email = email.value;
        } else {
          localStorage.checkbox = "";
          localStorage.pass = "";
          localStorage.email = "";
        }
      };

      btnLogin.addEventListener("click", () => {
        isRemember();
      });
    }
    if (email) {
      input.addEventListener("change", (e) => {
        e.preventDefault();
        let value = e.target.value.trim();
        if (value) {
          if (isEmailValid(value)) {
            input.style.border = "0";
            txtErr.innerHTML = "";
          } else {
            input.style.border = ".2rem solid #e87c03";
            txtErr.innerHTML = "Bạn cần nhập Email!";
          }
        } else {
          input.value = "";
          input.style.border = "0";
          txtErr.innerHTML = "";
        }
      });

      input.addEventListener("blur", (e) => {
        let value = e.target.value.trim();
        if (value === "") {
          input.value = "";
          input.style.border = "0";
          txtErr.innerHTML = "";
        }
      });
    }
    if (name) {
      input.addEventListener("change", (e) => {
        const value = e.target.value.trim();
        if (!value) {
          e.target.value = "";
          input.style.borderBottom = ".2rem solid #e87c03";
          txtErr.innerHTML = "Trường này không được để trống!";
        } else {
          txtErr.innerHTML = "";
          input.style.borderBottom = "";
        }
      });
    }
  });
};

const hasText = () => {
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

const btnRegisterNow = () => {
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

const btnLoginNow = () => {
  const loginNow = document.querySelector(".login__now");
  loginNow.addEventListener("click", () => {
    register.classList.add("d-none");
    login.classList.remove("d-none");
    formList.firstElementChild.classList.remove("d-none");
  });
};

const registerEmailInput = () => {
  listFormEmail.forEach((item) => {
    const textErr = item.querySelector(".input-error");
    const input = item.querySelector(".input-tag");
    const btn = item.querySelector("button");
    tagInput();

    input.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        btn.click();
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

const registerForm = () => {
  const register = document.querySelector(".register__form");
  const fullName = register.querySelector("#full__name");
  const email = register.querySelector("#create__email");
  const pass = register.querySelector("#create__password");
  const btnLoginNow = document.querySelector(".login__now");

  register.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueN = fullName.value;
    const valueE = email.value;
    const lengthP = pass.value.length;

    if (valueN == "" || !isEmailValid(valueE) || lengthP < MIN_LENGTH_PASS) {
      common.showErrorToast("", "Hãy chắc rằng bạn đã điền đầy đủ thông tin!");
    } else {
      loading(0.6);
      createUserWithEmailAndPassword(auth, valueE, pass.value)
        .then((UserCredential) => {
          updateProfile(auth.currentUser, {
            displayName: valueN,
          });
          common.showSuccessToast("Đăng ký thành công!");
          btnLoginNow.click();
          console.log(UserCredential.user);
          console.log(UserCredential.user.metadata.creationTime);
          const inputs = formLogin.querySelectorAll("input");
          inputs.forEach((input) => {
            hasText();
            input.name == "email"
              ? (input.value = valueE)
              : input.name == "password"
              ? (input.value = pass.value)
              : undefined;
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            common.showErrorToast("", "Tài khoản email đã tồn tại!");
          }
        });
    }
  });
};

const loginForm = () => {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = formLogin.querySelector(".email__login").value;
    const pass = formLogin.querySelector(".password__login").value;
    if (isEmailValid(email) && pass.length >= MIN_LENGTH_PASS) {
      loading(0.3);
      signInWithEmailAndPassword(auth, email, pass)
        .then((UserCredential) => {
          console.log(UserCredential);
          common.showSuccessToast("Đăng nhập thành công!");
        })
        .then(() => {
          setTimeout(() => {
            location.href = "./home.html";
          }, 400);
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "auth/user-not-found") {
            common.showErrorToast("", "Tài khoản không tồn tại!");
          }
          if (err.code === "auth/wrong-password") {
            common.showErrorToast("", "Mật khẩu không chính xác!");
          }
          if (err.code === "auth/too-many-requests") {
            common.showErrorToast(
              "",
              "Quyền truy cập bị vô hiệu hóa do bạn nhập sai mật khẩu nhiều lần!"
            );
          }
        });
    }
  });
};

const toggleShowPass = () => {
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

const btns = () => {
  toggleShowPass();
  downloadApp();
  btnHelp();
  closeBtn();
  registerEmailInput();
  btnRegisterNow();
  btnLogin();
  btnLoginNow();
  registerForm();
  loginForm();
};

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
  headerOnTop();
  faqQuestions();
});
