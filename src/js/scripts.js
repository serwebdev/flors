const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger-circle');
const menu = document.querySelector('.menu');
const html = document.querySelector('html');

const clientWidth = document.documentElement.clientWidth;
const widthScrollBody = window.innerWidth - document.body.clientWidth;
const paddingRightBody = getComputedStyle(header).paddingRight;

burger.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
    addScrollBody();
    header.style.paddingRight = parseInt(paddingRightBody) + 'px';
  } else {
    menu.classList.add('show');
    delScrollBody();
    header.style.paddingRight =
      parseInt(paddingRightBody) + widthScrollBody + 'px';
  }
});

function delScrollBody() {
  document.body.classList.add('no-scroll');
}
function addScrollBody() {
  document.body.classList.remove('no-scroll');
}
