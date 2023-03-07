// Scroll padding
const nav = document.querySelector('.nav');

const navHeight = nav.offsetHeight;
document.documentElement.style.setProperty(
  '--scroll-padding',
  navHeight + 'px'
);

// Menu

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menuBtn.toggleAttribute('data-open');
  menu.classList.toggle('disable');
  menu.classList.toggle('enable');
});

// Scrolling effect for sticky nav bar
const logo = document.querySelector('.logo');
let rect = document.querySelector('header').getBoundingClientRect();

// Remove sticky nav on lg screen
const removeSticky = function () {
  if (rect.width > 996) nav.classList.remove('sticky-nav');
};

removeSticky();

window.onscroll = function () {
  rect = document.querySelector('header').getBoundingClientRect();

  if (rect.width < 996) {
    nav.classList.add('sticky-nav');
    nav.classList.add('bg-prim-400');
    logo.classList.add('text-white');

    if (window.scrollY < 1) {
      nav.classList.remove('bg-prim-400');
      logo.classList.remove('text-white');
    }

    if (window.scrollY > rect.height) {
      menu.classList.add('disable');
      menu.classList.remove('enable');
      menuBtn.removeAttribute('data-open');
    }
  }

  removeSticky();
};
