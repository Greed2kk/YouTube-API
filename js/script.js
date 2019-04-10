//'use strict';

const switcher = document.querySelector('#cbx'), // id  #
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'), 
      videos = document.querySelectorAll('.videos__item'), // class . 
      header= document.getElementById('header');
      
    

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
    if (night === false){ 
        night = true; // переключятель
        //document.body.style.backgroundColor = '#000'; // черный цвет bg
        document.body.classList.remove('day'); // налепил говна 
        document.body.classList.add('night'); // добавление класса night в стиле прописать        
        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
        header.style.backgroundColor = '#282828';
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#ffffff';
        });
     
       
    } else {  
        night = false;
        document.body.classList.remove('night');    // налепил говна 
        document.body.classList.add('day');         // налепил говна 
        document.querySelector('.logo > img').src = 'logo/youtube.svg';
        header.style.backgroundColor = '#ffffff';
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });
    }
}

let night = false;


switcher.addEventListener('change', () => {
    switchMode();
    dayModeSwitcher();
});

function dayModeSwitcher() {  // налепил говна 
    let modeSwitcherDay = document.querySelector('.header__item-descr-day'),
      modeSwitcherNight = document.querySelector('.header__item-descr-night');
      modeSwitcherDay.style.opacity = '0';
    if( night === false) {
        modeSwitcherDay.style.opacity = '0';
        modeSwitcherNight.style.opacity = '1';     
    } else {
        modeSwitcherDay.style.opacity = '1';
        modeSwitcherNight.style.opacity = '0';     

    }    
}

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//         '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки  Урок 2',
//         '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
//   ];
  
  // more.addEventListener('click', () => {
  //   const videosWrapper = document.querySelector('.videos__wrapper');
  //   more.remove();
  
  //   for(let i = 0; i < data[0].length; i++) {
  //     let card = document.createElement('a');
  //     card.classList.add('videos__item', 'videos__item-active');
  //     card.setAttribute('data-url', data[3][i]);
  //     card.innerHTML = `
  //       <img src="${data[0][i]}" alt="thumb">
  //       <div class="videos__item-descr">
  //         ${data[1][i]}
  //       </div>
  //       <div class="videos__item-views">
  //         ${data[2][i]}
  //       </div>
  //     `;
  //     videosWrapper.appendChild(card);
  //     setTimeout(() => {
  //       card.classList.remove('videos__item-active');
  //     }, 10);
  //     if(night === true){
  //       /*
  //       card.querySelector('.videos__item-descr').style.color('#fff');
  //       card.querySelector('.videos__item-views').style.color('#fff');
  //     }
  //     */
  //     bindNewModal(card);
  //   }
  //   sliceTitle('.videos__item-descr', 80);
  // });
  
function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyDoLxZfaNGzRvhm47TSEQ5lIH0zw-fMfIo',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function() {
        return gapi.client.youtube.playlistItems.list({
          "part": "snippet,contentDetails",
          "maxResults": '6', // убрать ковычки
          "playlistId": "PLI_7Mg2Z_-4Ke14LWWl5z42dhA0F5GNpS"
        })    
    }).then(function(response){
          console.log(response.result);
    }).catch( e => {
          console.log(e);
    });
}

more.addEventListener('click', () => {
  more.remove();
  gapi.load('client', start);
});









  function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
      item.textContent.trim();
      if(item.textContent.length < count) {
        return;
      } else {
        const str = item.textContent.slice(0, count + 1) + "...";
        item.textContent = str;
      }
    });
  }
  
  sliceTitle('.videos__item-descr', 100);
  
  function openModal() {
    modal.style.display = 'block';
  }
  function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
  }
  function bindModal(cards) {
    cards.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const id = item.getAttribute('data-url');
        loadVideo(id)
        openModal();
      });
      modal.addEventListener('click', () => {
        if(!event.target.classList.contains('modal__body')) {
          closeModal();
        }
      });  
    });
  }
  
  bindModal(videos);
  
  function bindNewModal(cards) {
    cards.addEventListener('click', (event) => {
      event.preventDefault();
      const id = cards.getAttribute('data-url');
      loadVideo(id);
      openModal();
  
    });
  
    modal.addEventListener('click', () => {
      if(!event.target.classList.contains('modal__body')) {
        closeModal();
      }
    });
  }
  
  function createVideo() {
      // from https://developers.google.com/youtube/iframe_api_reference?hl=ru
     // 2. This code loads the IFrame Player API code asynchronously.
     var tag = document.createElement('script');
  
     tag.src = "https://www.youtube.com/iframe_api";
     var firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    setTimeout(() => {
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE',
      });    
    }, 300);
  }
  
  createVideo();
  
  function loadVideo(id) {
    player.loadVideoById({'videoId': `${id}`});
  }








//PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv

// AIzaSyDoLxZfaNGzRvhm47TSEQ5lIH0zw-fMfIo

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