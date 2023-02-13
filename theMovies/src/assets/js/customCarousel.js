// import "@lib/jquery-3.6.1.min.js";

import "@lib/Owlcarousel2/owl.carousel.min.js";

// import 'owl.carousel2/dist/assets/owl.carousel.css';
// import $ from 'jquery';
// import 'imports?jQuery=jquery!owl.carousel';

export let carousel = () => {
  $(document).ready(function () {
    $(".nominated-slide").owlCarousel({
      loop: true, // lặp lại các item
      margin: 10, // Khoảng cách giữa các item
      nav: true, // thanh điều hướng
      dots: false, // dấu chấm
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      navText: [
        `<span aria-label= "Previous">
        <i class="fa-solid fa-angle-left"></i>
      </span>`,

        `<span aria-label= "Next">
        <i class="fa-solid fa-angle-right"></i>
      </span>`,
      ],
      responsive: {
        0: {
          items: 1,
        },
        300: {
          items: 2,
          slideBy: 2,
        },
        768: {
          items: 3,
          slideBy: 3,
        },
        1100: {
          items: 4,
          slideBy: 4,
        },
      },
    });

    // $("#trend-slide").owlCarousel({
    //   loop: true, // lặp lại các item
    //   margin: 10, // Khoảng cách giữa các item
    //   nav: true, // thanh điều hướng
    //   dots: false, // dấu chấm
    //   autoplay: true,

    //   autoplayTimeout: 7000,
    //   autoplayHoverPause: true,
    //   navText: [
    //     `<span aria-label= "Previous">
    //       <i class="fa-solid fa-angle-left"></i>
    //     </span>`,

    //     `<span aria-label= "Next">
    //       <i class="fa-solid fa-angle-right"></i>
    //     </span>`,
    //   ],
    //   responsive: {
    //     0: {
    //       items: 1,
    //     },
    //     300: {
    //       items: 2,
    //       slideBy: 2,
    //     },
    //     768: {
    //       items: 3,
    //       slideBy: 3,
    //     },
    //     1100: {
    //       items: 4,
    //       slideBy: 4,
    //     },
    //   },
    // });

    // $("#coming-slide").owlCarousel({
    //   loop: true, // lặp lại các item
    //   margin: 10, // Khoảng cách giữa các item
    //   nav: true, // thanh điều hướng
    //   dots: false, // dấu chấm
    //   autoplay: true,

    //   autoplayTimeout: 7000,
    //   autoplayHoverPause: true,
    //   navText: [
    //     `<span aria-label= "Previous">
    //       <i class="fa-solid fa-angle-left"></i>
    //     </span>`,

    //     `<span aria-label= "Next">
    //       <i class="fa-solid fa-angle-right"></i>
    //     </span>`,
    //   ],
    //   responsive: {
    //     0: {
    //       items: 1,
    //     },
    //     300: {
    //       items: 2,
    //       slideBy: 2,
    //     },
    //     768: {
    //       items: 3,
    //       slideBy: 3,
    //     },
    //     1100: {
    //       items: 4,
    //       slideBy: 4,
    //     },
    //   },
    // });
  });
};
