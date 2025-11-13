/*========MAINSCRIPT start=====*/

document.addEventListener("DOMContentLoaded", function () {

  /*=== Typing Animation Start ===*/
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    const typedItems = typedElement
      .getAttribute('data-typed-items')
      .split(',')
      .map(item => item.trim());

    const typed = new Typed('.typed', {
      strings: typedItems,
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 1500,
      loop: true,

      // 🔹 Keep underline on while typing AND pausing
      preStringTyped: () => typedElement.classList.add('is-typing'),
      onStringTyped: () => typedElement.classList.add('is-typing'),

      // 🔹 Remove underline only when backspacing starts
      onLastStringBackspaced: () => typedElement.classList.remove('is-typing'),
      onReset: () => typedElement.classList.remove('is-typing'),
    });
  }
  /*=== Typing Animation End ===*/


  /*=== AOS Start ===*/
  AOS.init({
    duration: 1000,
    once: false
  });
  /*=== AOS End ===*/


  /*=== PureCounter Start ===*/
  new PureCounter();
  /*=== PureCounter End ===*/


  /*=== Progress Bar Start ===*/
  const bars = document.querySelectorAll('.progress-bar');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = value + '%';
        observer.unobserve(bar); // animate only once
      }
    });
  }, { threshold: 0.4 }); // 0.4 = 40% visible before triggering

  bars.forEach(bar => observer.observe(bar));
  /*=== Progress Bar End ===*/


  /*=== glightbox Start ===*/
  var iso = new Isotope('.isotope-container', {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'  // You can use 'masonry' if you prefer
  });

  var filterButtons = document.querySelectorAll('.portfolio-filters li');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('filter-active'));
      this.classList.add('filter-active');

      var filterValue = this.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
    });
  });
  
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    closeButton: true
  });
  /*=== GLightbox End ===*/

});

/*===Testimonial section start===*/

  var swiper = new Swiper('.init-swiper', {
    loop: true, // infinite rotation
    autoplay: {
      delay: 4000, // 4 seconds delay
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true, //pagination bullets
    },
    effect: 'slide', // can be 'fade', 'cube', 'coverflow', etc.
    speed: 800, //smoothtransition
    grabCursor: true, //handcursor
  });

/*===Testimonial section end===*/


/*====Auto-close header when any non-dropdown link is clicked start===*/
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('#header a:not(.dropdown a)');
  const toggle = document.getElementById('toggle');

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.checked = false;
    });
  });
});
/*====Auto-close header when any non-dropdown link is clicked end===*/


/*===Portfolio details slider start===*/
var portfolioSwiper = new Swiper('.portfolio-details-slider.swiper', {
  loop: true, // enables continuous rotation
  slidesPerView: 1,
  spaceBetween: 0,
  grabCursor: true,
  
  autoplay: {
    delay: 4000, // slide every 4 seconds
    disableOnInteraction: false, // keep autoplay running after user swipes
  },
  
  pagination: {
    el: '.portfolio-details-slider .swiper-pagination',
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  
  speed: 800, // smooth transition speed
});
/*===Portfolio details slider end===*/
alert('my js is running');

/*========END OF FILE=======*/
