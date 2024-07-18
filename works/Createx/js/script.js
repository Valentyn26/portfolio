class Slider {
    constructor(elem) {
        this._elem = elem;
        elem.addEventListener("click", this.onClick.bind(this));
        this._offset = 0;
    }

    slide(event) {
        const sliderBlock = document.querySelector('.block-slider__line');
        const slidesNumber = document.querySelectorAll('.block-slider__item').length;
        if (event.target.closest('.arrow-next')) {
            if ((slidesNumber - 1) * -100 == this._offset) {
                return;
            }
            this._offset += -100;
            sliderBlock.style.left = this._offset + "%";
        } else if (event.target.closest('.arrow-previous')) {
            if (0 == this._offset) {
                return;
            }
            this._offset += 100;
            sliderBlock.style.left = this._offset + "%";
        }
        this.countSlideNumber();
    }

    slideTo(event) {
        const sliderBlock = document.querySelector('.block-slider__line');
        let currentOffset = -100;
        let slideNumber = event.target.dataset.slideNumber;
        currentOffset *= slideNumber - 1;
        this._offset = currentOffset;
        sliderBlock.style.left = currentOffset + "%";
        this.countSlideNumber();
    }

    countSlideNumber() {
        let slides = document.querySelectorAll('[data-slide-number]');
        let activeSlide = document.querySelector('.switch-active');

        let arrowPrevious = document.querySelector('.arrow-previous');
        let arrowNext = document.querySelector('.arrow-next');

        let slidesNumber = document.querySelectorAll('.block-slider__item').length;
        let currentSlide = this._offset / -100 + 1;
        if (slidesNumber > currentSlide && currentSlide > 1) {
            arrowPrevious.classList.add('arrow-active');
            arrowNext.classList.add('arrow-active');
        } else if (currentSlide == 1) {
            arrowPrevious.classList.remove('arrow-active');
            arrowNext.classList.add('arrow-active');
        } else if (currentSlide == slidesNumber) {
            arrowPrevious.classList.add('arrow-active');
            arrowNext.classList.remove('arrow-active');
        }
        activeSlide.classList.remove('switch-active');
        activeSlide = slides[currentSlide - 1];
        activeSlide.classList.add('switch-active');
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action](event);
        }
    }
}

const elem = document.querySelector('.slider');
const slider = new Slider(elem);

const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

/* ============================================================= */

const swiper = new Swiper('.slider-works', {

    navigation: {
        nextEl: '.slider-arrow-next',
        prevEl: '.slider-arrow-prev',
    },

    spaceBetween: 30,

    touchRatio: 0,

    watchOverflow: true,

    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        1025: {
            slidesPerView: 3,
        },
    },
});

const clientsSwiper = new Swiper('.clients__body', {

    navigation: {
        nextEl: '.clients__slider-arrow-next',
        prevEl: '.clients__slider-arrow-prev',
    },

    simulateTouch: false,

    watchOverflow: true,
});

/* ============================================================= */

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

let par = document.querySelectorAll('.coll-body');
let el = document.querySelectorAll('.coll-body__content');

const items = document.querySelectorAll('[data-collapse]');

items.forEach((item, index) => {
    const collapse = new Collapse(el[index], par[index]);
    item.addEventListener("pointerdown", (e) => {
        if (e.pointerType == 'pen' || e.pointerType == 'touch') {
            collapse.toggle();
        }
    });
    item.addEventListener("pointerover", (e) => {
        if (!(e.pointerType == 'pen' || e.pointerType == 'touch')) {
            collapse.show();
        }
    });
    item.addEventListener("pointerout", (e) => {
        if (!(e.pointerType == 'pen' || e.pointerType == 'touch')) {
            collapse.hide();
        }
    });
});

/* ============================================================= */

function setProgressRing(circle, infoTag) {
    const radius = circle.r.baseVal.value;
    const circleLength = 2 * Math.PI * radius;
    const percent = parseFloat(infoTag.textContent);

    circle.style.strokeDasharray = `${circleLength} ${circleLength}`;
    circle.style.strokeDashoffset = circleLength;

    setProgress(percent, circleLength);
}

function setProgress(percent, length) {
    let offset = length - percent / 100 * length;
    circle.style.strokeDashoffset = offset;
}

const circle = document.querySelector('.progress-ring__circle');
const infoTag = document.querySelector('.progress-wrapper__item span');
setProgressRing(circle, infoTag);

/* ============================================================= */

const parentBlock = document.querySelector('.go-to');
const goToButton = document.querySelector('.go-to__button');
scrollToButton(parentBlock, goToButton);

function scrollToButton(parentBlock, button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
    document.addEventListener("scroll", function (event) {
        if (window.scrollY > document.querySelector('.services').getBoundingClientRect().top) {
            if (!parentBlock.classList.contains('active')) {
                parentBlock.classList.add('active');
            }
        } else {
            if (parentBlock.classList.contains('active')) {
                parentBlock.classList.remove('active');
            }
        }
    });
}







