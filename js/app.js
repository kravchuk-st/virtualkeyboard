import { keys } from './key.js';

window.addEventListener('keydown', (ev) => {
  ev.preventDefault();
})

window.addEventListener('keyup', (ev) => {
  ev.preventDefault();
})

let body = document.querySelector('body');
body.addEventListener('keydown', (ev) => {
  ev.preventDefault();
})

body.addEventListener('keyup', (ev) => {
  ev.preventDefault();
})

let container = document.createElement('div');
container.classList.add('container');
body.prepend(container);

let title = document.createElement('h1')
title.innerText = 'RSS Виртуальная клавиатура';
container.append(title);

let textarea = document.createElement('textarea');
textarea.classList.add('body-textarea');
textarea.id = 'textarea';
textarea.setAttribute('cols', '70');
textarea.setAttribute('rows', '10');
container.append(textarea);

let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
keyboard.id = 'keyboard';
container.append(keyboard);

let description = document.createElement('p');
description.classList.add('description');
description.innerText = 'Клавиатура создана в операционной системе Windows';
container.append(description);

let language = document.createElement('p');
language.classList.add('language');
language.innerText = 'Для переключения языка используйте комбинацию клавиш: левыe Ctrl + Shift';
container.append(language);




class Keyboard {
    
    langOptions = {
        'en': 'en',
        'ru': 'ru',
    }

    // lang = this.langOptions.en;

    
    value = "";

    keyCodes = [...keys];

    specialKeyCodes = [
        {'Enter': `\r\n`},
        {'Tab': '    '},
    ];

    isShiftACtive = false;
    isCapsLockActive = false;


    constructor() {
        this.lang = this.getSetingds();
        this.createVirtualKeyboard();

        this.lisenKeybord();
        this.lisenScreen();
        this.saveSetingds();
    }
    

    saveSetingds() {
      if(window.localStorage) {
        document.onkeydown = function(ev) {
          if(ev.keyCode === 17) {
            document.onkeyup = function(ev) {
              if (ev.keyCode === 16) {
                if (localStorage.getItem("lang") === 'en') {
                  localStorage.setItem("lang", "ru");
                } else {
                  localStorage.setItem("lang", "en");
                }
              }
            }
          }
        }
      }
    }


    getSetingds() {
      if(window.localStorage) {
        if (localStorage.getItem("lang")) {
          if (localStorage.getItem("lang") === 'en') {
            return this.langOptions.en
          } else if (localStorage.getItem("lang") === 'ru') {
            return this.langOptions.ru
          }
        } else {
          return this.langOptions.en
        }
      }
    }

    findSpecialSymbol(eventKey) {
      let res;
        this.specialKeyCodes.forEach((obj) => {
          const keySymbolArr = Object.entries(obj);
          if (eventKey === keySymbolArr[0][0]) {
              res = keySymbolArr[0][1];
              return;
          }
      })

      return res;
    }

    lisenKeybord() {
        document.getElementById('textarea').addEventListener('keypress', ev => ev.preventDefault());

        window.addEventListener('keydown', (ev) => {
          let el = document.querySelector(`div[data-keycode='${ev.keyCode}']`);
          if (ev.keyCode !== 20 && ev.keyCode !== 16 && ev.keyCode !== 17 && ev.keyCode !== 18) {
            el.classList.add('active');
            setTimeout(function(){
              el.classList.remove('active');
            }, 300)
          }
          let ind;
          keys.forEach((el, index) => {
            if (Object.values(el).includes(+ev.keyCode)) {
              ind = index;
            }
          });

          const textSymbol = this.findSpecialSymbol(ev.key);

          switch (this.lang) {
            case this.langOptions.en:
              if ((this.isShiftACtive === true && this.isCapsLockActive === false) || (this.isShiftACtive === false && this.isCapsLockActive === true)) {
                textarea.value += (textSymbol) ? textSymbol : (keys[ind]['en']).toUpperCase();
              } else{
                textarea.value += (textSymbol) ? textSymbol : keys[ind]['en'].toLowerCase();
              }

              break;

            case this.langOptions.ru:
              if ((this.isShiftACtive === true && this.isCapsLockActive === false) || (this.isShiftACtive === false && this.isCapsLockActive === true)) {
                textarea.value += (textSymbol) ? textSymbol : (keys[ind]['ru']).toUpperCase();
              } else{
                textarea.value += (textSymbol) ? textSymbol : keys[ind]['ru'].toLowerCase();
              }
              break;

            default:
              break;
          }

          
          });
    }


    lisenScreen() {
        document.querySelectorAll('.key').forEach((el) => {
            el.addEventListener('click', (ev) => {
              if ((ev.target.dataset.keycode !== '20') && (ev.target.dataset.keycode !== '16') && (ev.target.dataset.keycode !== '17') && (ev.target.dataset.keycode !== '18')) {
                let el = document.querySelector(`div[data-keycode='${ev.target.dataset.keycode}']`);
                el.classList.add('active');
                let ind;
                keys.forEach((el, index) => {
                  if (Object.values(el).includes(+ev.target.dataset.keycode)) {
                    ind = index;
                  }
                });
                textarea.value += keys[ind][this.lang];
    
                setTimeout(function(){
                  el.classList.remove('active');
                }, 200)
              }
            });
        })
    }


    createVirtualKeyboard() {
        // add html and events
        let out = '';
        switch (this.lang) {
            case this.langOptions.en:
              this.keyCodes.forEach(el => {
                out += `<div class="key" data-keyCode="${el.keyCode}">${el.en}</div>`;


                // keyElement.addEventListener("click", () => {
                //     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                //     this._triggerEvent("oninput");
                // });
              })
                
              break;

            case this.langOptions.ru:
            
                this.keyCodes.forEach(el => {
                    out += `<div class="key" data-keyCode="${el.keyCode}">${el.ru}</div>`;


                    // keyElement.addEventListener("click", () => {
                    //     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    //     this._triggerEvent("oninput");
                    // });
                })
                
                break;
        
            default:
                break;

        }
        document.querySelector('.keyboard').innerHTML = out;

        const backspace = document.querySelector("div[data-keycode='8']");
        backspace.classList.add('Backspace');
        backspace.innerText = 'Backspace';

        const tab = document.querySelector("div[data-keycode='9']");
        tab.classList.add('Tab');
        tab.innerText = 'Tab';

        const enter = document.querySelector("div[data-keycode='13']");
        enter.classList.add('Enter');
        enter.innerText = 'Enter';
        // enter.key = '\n';

        const shiftLeft = document.querySelectorAll("div[data-keycode='16']")[0];
        shiftLeft.classList.add('ShiftLeft');
        shiftLeft.innerText = 'Shift';

        const shiftRight = document.querySelectorAll("div[data-keycode='16']")[1];
        shiftRight.classList.add('ShiftRight');
        shiftRight.innerText = 'Shift';

        const ctrlLeft = document.querySelectorAll("div[data-keycode='17']")[0];
        ctrlLeft.classList.add('ControlLeft');
        ctrlLeft.innerText = 'Ctrl';

        const ctrlRight = document.querySelectorAll("div[data-keycode='17']")[1];
        ctrlRight.classList.add('ControlRight');
        ctrlRight.innerText = 'Ctrl';

        const altLeft = document.querySelectorAll("div[data-keycode='18']")[0];
        altLeft.classList.add('AltLeft');
        altLeft.innerText = 'Alt';

        const altRight = document.querySelectorAll("div[data-keycode='18']")[1];
        altRight.classList.add('AltRight');
        altRight.innerText = 'Alt';

        const win = document.querySelector("div[data-keycode='91']");
        win.classList.add('Win');
        win.innerText = 'Win';

        const capsLock = document.querySelector("div[data-keycode='20']");
        capsLock.classList.add('CapsLock');
        capsLock.innerText = 'CapsLock';

        const arrowUp = document.querySelector("div[data-keycode='38']");
        arrowUp.innerText = '\u2191';

        const arrowLeft = document.querySelector("div[data-keycode='37']");
        arrowLeft.innerText = '\u2190';

        const arrowDown = document.querySelector("div[data-keycode='40']");
        arrowDown.innerText = '\u2193';

        const arrowRight = document.querySelector("div[data-keycode='39']");
        arrowRight.innerText = '\u2192';

        const space = document.querySelector("div[data-keycode='32']");
        space.classList.add('Space');

        const del = document.querySelector("div[data-keycode='46']");
        del.classList.add('Del');
        del.innerText = 'del';
    }

}


window.addEventListener("DOMContentLoaded", function () {
  const keybord = new Keyboard();

  let isShift = false;
  let isCLock = false;

  let capsLockKey = document.querySelector('.CapsLock');
  capsLockKey.addEventListener('click', (ev) => {
    capsLockKey.classList.toggle('active');
  });

  document.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('ControlLeft')) {
      ev.target.classList.add('active');
      setTimeout(function(){
        ev.target.classList.remove('active');
      }, 300)
    }

    if (ev.target.classList.contains('ControlRight')) {
      ev.target.classList.add('active');
      setTimeout(function(){
        ev.target.classList.remove('active');
      }, 300)
    }

    if (ev.target.classList.contains('AltLeft')) {
      ev.target.classList.add('active');
      setTimeout(function(){
        ev.target.classList.remove('active');
      }, 300)
    }

    if (ev.target.classList.contains('AltRight')) {
      ev.target.classList.add('active');
      setTimeout(function(){
        ev.target.classList.remove('active');
      }, 300)
    }
  });

  window.addEventListener('keydown', (ev) => {
    if (ev.keyCode === 20) {
      ev.preventDefault();
      capsLockKey.classList.toggle('active');
    }

    if (ev.keyCode === 17) {
      document.querySelector(`.${ev.code}`).classList.add('active');
      setTimeout(function(){
        document.querySelector(`.${ev.code}`).classList.remove('active');
      }, 300)
    }

    if (ev.keyCode === 18) {
      document.querySelector(`.${ev.code}`).classList.add('active');
      setTimeout(function(){
        document.querySelector(`.${ev.code}`).classList.remove('active');
      }, 300)
    }
  })

});

// document.onkeydown = function(ev) {
//   if(ev.keyCode === 17) {
//     document.onkeyup = function(ev) {
//       if (ev.keyCode === 16) {
//         document.querySelector('.keyboard').innerHTML = '';
//         Keyboard.createVirtualKeyboard();
//       }
//     }
//   }
// }

// function changeCaseText() {
//   let capsLock = document.querySelector(".CapsLock");
//   capsLock.addEventListener('click', () => {
//     this.isCapsLockActive = !this.isCapsLockActive;
//     capsLock.classList.toggle('active');
//   })

//   window.addEventListener('keydown', (ev) => {
//     if (ev.keyCode === 20) {
//       ev.preventDefault();
//       this.isCapsLockActive = !this.isCapsLockActive;
//       capsLock.classList.toggle('active');
//     }
//   })
// }