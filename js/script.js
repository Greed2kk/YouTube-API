//'use strict';

const switcher = document.querySelector('#cbx'), // id  #
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'), 
      videos = document.querySelectorAll('.videos__item'); // class . 
let player;


function blindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
          boxContent = document.querySelector(content);
    
    button.element.addEventListener('click', () => {
        if (button.active === false) { // проверка меню на не активность
            button.active = true;
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass);  // активный класс для слайда
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);  
        }
    });  //обработчик события addEventListener и стрелочная функция
}

blindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {     
    if (night === false ){  // переключятель
        document.body.style.backgroundColor = '#000'; // черный цвет bg
        //document.body.classList.add('night');
    }

}

let night = false;
switcher.addEventListener('change', () => {
    switchMode();
});




/*
const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки  Урок 2',
        '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];
*/