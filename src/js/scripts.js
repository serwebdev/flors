const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger-circle');
const menu = document.querySelector('.menu');
const html = document.querySelector('html');

const paddingHeader = 20;

burger.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
    addScrollBody();
    document.body.style.paddingRight = '';
    // убирает padding-right для header
    header.style.paddingRight = paddingHeader + 'px';
  } else {
    menu.classList.add('show');
    // Ширина body до открытия меню
    const widthBodyBefore = document.body.clientWidth;
    delScrollBody();

    addPaddingBody(widthBodyBefore);
  }
});

// Добавляет padding-right для body
function addPaddingBody(widthBodyBefore) {
  // Ширина body после открытия меню
  const widthBodyAfter = document.body.clientWidth;
  // Ширина скролл-бара
  const widthScroll = widthBodyAfter - widthBodyBefore;
  // padding-right для body
  document.body.style.paddingRight = widthScroll + 'px';
  // padding-right для header
  header.style.paddingRight = paddingHeader + widthScroll + 'px';
}

function delScrollBody() {
  document.body.classList.add('no-scroll');
}
function addScrollBody() {
  document.body.classList.remove('no-scroll');
}

// types__gallery==========================================================
// const typesCardBtn = document.querySelectorAll('.types__card-btn');
