import "@lib/Owlcarousel2/assets/owl.carousel.min.css";
import "@lib/Owlcarousel2/assets/owl.theme.default.min.css";
import "@lib/Owlcarousel2/owl.carousel.min.js";

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
