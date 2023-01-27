export const navSearchDesktop = () => {
  const inputDesktop = document.querySelector("#search__desktop");
  console.log(inputDesktop);
  inputDesktop.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.keycode);
    if (e.target.value !== "") {
      window.location.href = `./search.html?q=${e.target.value}`;
    }
  });
};

export const navSearchMobile = () => {
  const inputMobile = document.querySelector("#search__mobile");
  inputMobile.addEventListener("blur", (e) => {
    e.preventDefault();
    console.log(e.target.value);
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
  });
  overlay.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
};
