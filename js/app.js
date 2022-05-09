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

    isShiftACtive = false;
    isCapsLockActive = false;


    constructor() {
        this.lang = this.getSetingds();
        this.createVirtualKeyboard();

        this.lisenKeybord();
        this.lisenScreen();
        this.saveSetingds();
        this.functionalKeys();
    }

    saveSetingds() {
      if(window.localStorage) {
        document.onkeydown = (ev) => {
          if(ev.keyCode === 16) {
            document.onkeyup = (event) => {
              if (event.keyCode === 17) {

                if (localStorage.getItem("lang") === 'en') {
                  this.lang = this.langOptions.ru;
                } else {
                  this.lang = this.langOptions.en;
                }

                localStorage.setItem("lang", this.lang);

                this.createVirtualKeyboard();
                this.lisenScreen();
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

    isUppercase() {
      if (this.isCapsLockActive && this.isShiftACtive) {
        return false;
      }
      return this.isCapsLockActive || this.isShiftACtive;
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

        textarea.value += (this.isUppercase()) ? keys[ind][this.lang].toUpperCase() :keys[ind][this.lang];
      });
    }

  functionalKeys () {
    document.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('CapsLock')) {
        this.isCapsLockActive = !this.isCapsLockActive;
        ev.target.classList.toggle('active');
      }

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

      if (ev.target.classList.contains('Backspace')) {
        document.querySelector('#textarea').value = document.querySelector('#textarea').value.slice(0, -1);
      }
      
      if (ev.target.classList.contains('Del')) {
        document.querySelector('#textarea').value = '';
      }
    });

    document.addEventListener('mousedown', (ev) => {
      if (ev.target.classList.contains('ShiftLeft')) {
        ev.target.classList.add('active');
        this.isShiftACtive = true;
      }

      if (ev.target.classList.contains('ShiftRight')) {
        ev.target.classList.add('active');
        this.isShiftACtive = true;
      }
    });

    document.addEventListener('mouseup', (ev) => {
      if (ev.target.classList.contains('ShiftLeft')) {
        ev.target.classList.remove('active');
        this.isShiftACtive = false;
      }

      if (ev.target.classList.contains('ShiftRight')) {
        ev.target.classList.remove('active');
        this.isShiftACtive = false;
      }
    });

    window.addEventListener('keydown', (ev) => {
      if (ev.keyCode === 20) {
        this.isCapsLockActive = !this.isCapsLockActive;
        document.querySelector(`.${ev.code}`).classList.toggle('active');
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

      if (ev.keyCode === 16) {
        this.isShiftACtive = true;
        document.querySelector(`.${ev.code}`).classList.add('active');
      }

      if (ev.keyCode === 8) {
        document.querySelector('#textarea').value = document.querySelector('#textarea').value.slice(0, -1);
      }

      if (ev.keyCode === 46) {
        document.querySelector('#textarea').value = '';
      }
    });

    window.addEventListener('keyup', (ev) => {
      if (ev.keyCode === 16) {
        this.isShiftACtive = false;
        document.querySelector(`.${ev.code}`).classList.remove('active');
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
              textarea.value += this.isUppercase() ? keys[ind][this.lang].toUpperCase() : keys[ind][this.lang];
  
              setTimeout(function(){
                el.classList.remove('active');
              }, 200)
            }
          });
      })
  }


  createVirtualKeyboard() {
    let out = '';

    const isUppercase = this.isUppercase()

    this.keyCodes.forEach(el => {
      out += `<div class="key" data-keyCode="${el.keyCode}">${isUppercase ? (el.en).toUpperCase() : el[this.lang]}</div>`;
    })

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
});
