

window.onload = function () {
    const headerH = document.querySelector('.header').offsetHeight;
    document.onscroll = function () {
        if (window.scrollY >= headerH - 1) {
            document.querySelector('.menu').classList.add('fixed');
            document.querySelector('.menu__container').style.padding = '15px';
            document.body.style.paddingTop = document.querySelector('.menu').offsetHeight + (headerH - document.querySelector('.header').offsetHeight) + 'px';
        } else {
            document.querySelector('.menu').classList.remove('fixed');
            document.body.style.paddingTop = '';
            document.querySelector('.menu__container').style.padding = '';
        }
    }

    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick)
        });

        function onMenuLinkClick(e) {
            e.preventDefault();
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                if (window.scrollY >= headerH) {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.menu').offsetHeight;

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                } else {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                }
            }
        }
    }

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

    let par = document.querySelectorAll('.info-team');
    let el = document.querySelectorAll('.info-team__body');

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
}
