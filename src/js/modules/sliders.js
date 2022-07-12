const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;


    const items = document.querySelectorAll(slides);
        



    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
     

        items[slideIndex - 1].style.display = 'block';
    }
    
    showSlides(slideIndex);

    function changeSlides(n) {
        showSlides(slideIndex += n);

    }
    try{
       const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIndex - 1].classList.add('slideInRight');
            items[slideIndex - 1].addEventListener('animationend', () => {
                items[slideIndex - 1].classList.remove('slideInRight');
              });
        });
        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.add('slideInLeft'); 
            items[slideIndex - 1].addEventListener('animationend', () => {
                items[slideIndex - 1].classList.remove('slideInLeft');
              });
        });
    } catch(e) {}

    //paused receive uid of setInterval(choosing interval u need)
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function() {
                changeSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
                items[slideIndex - 1].addEventListener('animationend', () => {
                    items[slideIndex - 1].classList.remove('slideInDown');
                  });
            },3000);
        } else {
            paused = setInterval(function() {
                changeSlides(1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
                items[slideIndex - 1].addEventListener('animationend', () => {
                    items[slideIndex - 1].classList.remove('slideInRight');
                  });      
            },3000);
        }
    }

    activateAnimation();


        //using paused we stopped animation of definite slider
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default sliders;