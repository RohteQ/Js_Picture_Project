

const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    }); 

    //Scrolling with requestAnimationFrame


    //in [] attribute, we looking for all links which started with #
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(frame);

            function frame(time) {
                //check if we start animation first time,on the next itteration(next start animation) start will not be null
                if (start == null) {
                    start = time;
                }
                //time is new everyIteration of animation, position start we calculate only at start when we started animation
                let progress = time - start,
                //how many px-s we need to scroll during this animation and in witch side
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r); 

                //when stop animation

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(frame);
                }else {
                    location.hash = hash;
                }
            }
        });
    });


    //PURE JS scrolling
    // const element = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(e) {
    //         //how much scrolled by user
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
    //         //if link(hash)
    //         if (this.hash !== '') {
    //             e.preventDefault();
    //             //where link  connected => using getElementById from hash get str without #, or using querySelector we get with #
    //             let hashElement = document.querySelector(this.hash),
    //             //how many px-s  to the parent of hash element
    //                 hashElementTop = 0;

    //             //sort out all parents of hashElemenet to know  how many px-s  we need to scroll
    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }
                
    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;
    // //if from top to the bottom
    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }
    
    //     let move = setInterval(function() {
    //         //we need next str cause when we start calcScroll() we calculate the first, static value and it will not change , when we start animation one of this values will change every time and we need to know value at the moment

    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); 

    //         if (
    //             //last animation = what we want to get
    //               prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearTimeout(move);
    //             //all # in the end of our href str
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop +=speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};


export default scrolling;