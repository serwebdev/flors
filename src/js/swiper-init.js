const swiper = new Swiper('.swiper', {
  // Optional parameters
  // Количество слайдов на просмотр (слайды, видимые одновременно в контейнере слайдера)
  slidesPerView: 3,

  // Установите количество слайдов, чтобы определить и включить групповое слайдирование. Полезно использовать со slidesPerView > 1
  slidesPerGroup: 1,

  // Расстояние между слайдами в px
  spaceBetween: 30,

  // Скорость перелистывания
  speed: 300,

  //   Установите, true чтобы включить режим непрерывного цикла
  loop: true,

  // Автопрокрутка
  // autoplay: {
  // Задержка между переходами (в мс). Если этот параметр не указан, автовоспроизведение будет отключено.
  // delay: 1000,
  //Установите false и автовоспроизведение не будет отключено после взаимодействия с пользователем (пролистывания), оно будет перезапускаться каждый раз после взаимодействия
  // disableOnInteraction: false,
  // Когда включено, автовоспроизведение будет приостановлено при вводе мыши над контейнером Swiper. Если disableOnInteractionтакже включен, он остановит автовоспроизведение вместо паузы
  // pauseOnMouseEnter: true,
  // },

  // Брейкпоинты (точки останова)
  //   breakpoints: {
  //     // when window width is >= 320px
  //     320: {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //     },
  //     // when window width is >= 480px
  //     480: {
  //       slidesPerView: 3,
  //       spaceBetween: 30,
  //     },
  //     // when window width is >= 640px
  //     640: {
  //       slidesPerView: 4,
  //       spaceBetween: 40,
  //     },
  //   },

  //   Индек начального слайда
  //   initialSlide: 0,

  // Добавить (в пикселях) дополнительное смещение слайда в конце контейнера (после всех слайдов)
  // slidesOffsetAfter: 100,

  // Добавить (в пикселях) дополнительное смещение слайда в начале контейнера (перед всеми слайдами)
  // slidesOffsetBefore: 100,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    // Строка с типом разбиения на страницы. Может быть 'bullets', 'fraction' или 'progressbar' 'custom'
    // type: "bullets",
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
    // Размер перетаскиваемого элемента полосы прокрутки в пикселях
    // dragSize: "auto",
    // Установите, true чтобы сделать полосу прокрутки перетаскиваемой, что позволяет вам управлять положением ползунка
    // draggable: false,
  },
});
