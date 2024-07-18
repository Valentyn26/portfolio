class Collapse {
    constructor(elem, parent) {
        this._elem = elem;
        this._parent = parent;
    }
    show() {
        const el = this._elem;
        const par = this._parent;

        const height = el.offsetHeight;
        // if (!par.style['transition']) {
        //     par.style['transition'] = 'all 0.5s ease 0s';
        //     el.style['transition'] = 'all 0.5s ease 0s';
        // }
        el.classList.add('open');
        par.style['height'] = `${height}px`;
    }
    hide() {
        const el = this._elem;
        const par = this._parent;

        par.style['height'] = 0;
        el.classList.remove('open');
    }
    toggle() {
        this._elem.classList.contains('open') ? this.hide() : this.show();
    }
}

let par = document.querySelectorAll('.collapse');
let el = document.querySelectorAll('.collapse__body');

const items = document.querySelectorAll('[data-collapse]');
const collapses = [];

items.forEach((item, index) => {
    collapses.push(new Collapse(el[index], par[index]));
});

const menuLinks = document.querySelectorAll('.monitor__button[data-goto]');
let scrollingElem = document.querySelector('.hiding-block');

let arrowToTop = document.querySelector('.arrow-to-top');
let circleToTop = document.querySelector('.circle-to-top');
let elemLocation;
let elemPreviousLocation;

document.addEventListener('click', function (event) {

    items.forEach((item, index) => {
        if (item == event.target.closest('[data-collapse]')) {
            collapses[index].toggle();
            item.classList.toggle('active');
        }
    });

    if (menuLinks.length > 0) {
        if (event.target.closest('[data-goto]')) {
            event.preventDefault();
            const menuLink = event.target.closest('[data-goto]');
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollingElem.scrollTop - (document.querySelector('.monitor__buttons-mobile').offsetHeight);

                if (document.documentElement.clientWidth > 768) {
                    scrollingElem.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                } else {
                    scrollingElem.scrollTo({
                        top: gotoBlockValue - 50,
                        behavior: "smooth"
                    });
                }
            }
        }
    }

    if (event.target.closest('.circle-to-top')) {
        if (!arrowToTop.classList.contains('rotate')) {
            elemPreviousLocation = scrollingElem.scrollTop;
        }
        if (!arrowToTop.classList.contains('rotate')) {
            customScrollTo(0, 700);
            arrowToTop.classList.add('rotate');
        } else {
            customScrollTo(elemPreviousLocation, 700);
            arrowToTop.classList.remove('rotate');
        }
    }
});

scrollingElem.addEventListener('scroll', function () {
    elemLocation = scrollingElem.scrollTop;
    if (elemLocation > 400) {
        if (!circleToTop.classList.contains('active')) {
            circleToTop.classList.add('active');
        }
    } else if (!elemPreviousLocation) {
        if (circleToTop.classList.contains('active')) {
            circleToTop.classList.remove('active');
        }
    }
    if (elemPreviousLocation <= elemLocation) {
        arrowToTop.classList.remove('rotate');
    }
});

document.addEventListener("pointerover", (event) => {

    items.forEach((item, index) => {
        if (item == event.target.closest('.projects__items [data-collapse]')) {
            if (!(event.pointerType == 'pen' || event.pointerType == 'touch')) {
                item.classList.add('hover');
            }
        }
    });

});

document.addEventListener("pointerout", (event) => {

    items.forEach((item, index) => {
        if (item == event.target.closest('.projects__items [data-collapse]')) {
            if (!(event.pointerType == 'pen' || event.pointerType == 'touch')) {
                item.classList.remove('hover');
            }
        }
    });

});

/* ============================================================================= */

function contentSize() {
    let monitorWidth = document.querySelector('.monitor__border-block').clientWidth;
    let contentWidth = document.querySelector('.header').clientWidth;
    let diff = contentWidth - monitorWidth;
    let wrapper = document.querySelector('.wrapper');
    if (document.documentElement.clientWidth > 768) {
        let rigth = parseFloat(wrapper.style.paddingRight);
        if (rigth) {
            wrapper.style.paddingRight = rigth + diff - 1 + 'px';
        } else {
            wrapper.style.paddingRight = diff - 1 + 'px';
        }
    } else {
        wrapper.style.paddingRight = 0 + 'px';
    }
}

contentSize();

window.onresize = function () {
    contentSize();
}

window.onbeforeunload = function () {
    let windowScroll = scrollingElem.scrollTop
    sessionStorage.setItem('scroll', windowScroll);
};

if (sessionStorage.getItem('scroll')) {
    scrollingElem.scrollTo(0, sessionStorage.getItem('scroll'));
}


// function customScrollTo(positionY, duration) {
//     let diff = scrollingElem.scrollTop - positionY;
//     let step = duration / diff;
//     customScrollToY(step);
// }

// function customScrollToY(step) {
//     scrollingElem.scrollTop -= 10;
//     setTimeout(function () {
//         if (scrollingElem.scrollTop) {
//             customScrollToY(step);
//         }
//     }, step * 10);
// }


// Bind your button click, scroll direction and effect speed

// Element to move, time in ms to animate
function customScrollTo(element, duration) {
    var e = scrollingElem;
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        circleToTop.classList.remove('noEvent');
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;
    circleToTop.classList.add('noEvent');
    setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
}

