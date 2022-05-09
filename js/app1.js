let body = document.querySelector('body');

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

    lang = this.langOptions.en;

    
    value = "";
    capsLock = false;

    keyCodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 61, 8, 9, 81, 87, 69, 82, 116, 121, 117, 105, 111, 112, 91, 93, 92, 20, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 13, 16, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 38, 16, 17, 91, 18, 32, 18, 37, 40, 39, 17];
    keys = {
        'en': {},
        'ru': {
            113: 'й',
            119: 'ц',
        },
        specialSymbols: {

        }
    }

    specialKeyCodes = [
        {'Enter': `\r\n`},
        {'Tab': '    '},
    ];

    isShiftACtive = false;
    isAltActive = false;


    constructor() {
        this.lang = this.getSetingds();
        this.createVirtualKeyboard();

        this.lisenKeybord();
        this.lisenScreen();
    }
    

    saveSetingds() {

    }


    getSetingds() {
        // load data from LS

        return this.langOptions.en
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
        window.addEventListener('languagechange', function() {
            console.log('languagechange event detected!');
        });

        document.getElementById('textarea').addEventListener('keypress', ev => ev.preventDefault());

        window.addEventListener('keydown', (ev) => {
            console.log(ev);
        })

        window.addEventListener('keydown', (ev) => {
            let el = document.querySelector(`div[data-keycode='${ev.keyCode}']`);
            el.classList.add('active');

            // if (ev.keycode === 'alt') {
            //     this.isAltActive = true;
            // }

            const textSymbol = this.findSpecialSymbol(ev.key);
            textarea.value += (textSymbol) ? textSymbol : String(ev.key);

            setTimeout(function(){
                el.classList.remove('active');
              }, 300)
        });
    }


    lisenScreen() {
        document.querySelectorAll('.key').forEach((el) => {
            el.addEventListener('click', (ev) => {
                let el = document.querySelector(`div[data-keycode='${ev.target.dataset.keycode}']`);
    
                el.classList.add('active');
                textarea.value += String.fromkeycode(ev.target.dataset.keycode);
    
                setTimeout(function(){
                    el.classList.remove('active');
                  }, 200)
            });
        })
    }


    createVirtualKeyboard() {
        // add html and events
        
        let out = '';
        switch (this.lang) {
            case this.langOptions.en:
                
                this.keyCodes.forEach(el => {
                    out += `<div class="key" data-keyCode="${el}">${String.fromCharCode(el)}</div>`;


                    // keyElement.addEventListener("click", () => {
                    //     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    //     this._triggerEvent("oninput");
                    // });
                })
                
                break;

            case this.langOptions.ru:
            
                this.keyCodes.forEach(el => {
                    out += `<div class="key" data-keyCode="${el}">${String.fromCharCode(el)}</div>`;


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
        enter.key = '\n';

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


    _toggleCapsLock() {
        this.capsLock = !this.capsLock;
        capsLock.classList.toggle('active');

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }




}


window.addEventListener("DOMContentLoaded", function () {
   const keybord = new Keyboard();
});

