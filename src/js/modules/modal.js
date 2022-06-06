const modals = (state) => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector (closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();


        trigger.forEach(item => {
            let event = item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                 }
                 //if user click on some btn 
                 btnPressed = true;

                 //destroing gift img after click
                 if (destroy = 'true') {
                     item.remove();
                 }


                if (modal.classList.contains('popup_calc_profile')) {
                    if (!state.form || !state.width || !state.height) {
                        event.removeEventListener();
                    }
                }
                if (modal.classList.contains('popup_calc_end')) {
                    if (!state.type || !state.profile) {
                        event.removeEventListener();
                    }
                }


            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });
    
                modal.style.display = 'block';
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
    
            });
        });
        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            windows.forEach(item => {
                item.style.display = 'none';
            });
    

        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
        //paragraph 14 
        let display;
        //if every modal which enumiration right now showing to the user
        document.querySelectorAll('[data-modal]').forEach(item => {
            if (getComputedStyle(item).display !== 'none') {
                //in logical context = true
                display = 'block';
            }
        });
        //if noone modal isnt showing  = show modal which we need
        if (!display) {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
            let scroll = calcScroll();
            document.body.style.marginRight = `${scroll}px`;
          }
        }, time);
    }
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            //for optimization create new variable,mathmax returning bigger num
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            //2d condition = whether the user scrolled to the end of the page
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight )) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    
    showModalByTime('.popup-consultation', 60000);
};

export default modals;