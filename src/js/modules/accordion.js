const accordion = (triggersSelector) => {
    //2 options -css or next sibling  
    // // 2d option next sibling  
    const btns = document.querySelectorAll(triggersSelector);


        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                hideBlock();
                this.classList.toggle('active-style');
                //active class not on heading, we put it on content
                this.nextElementSibling.classList.toggle('active-content');

                if (this.classList.contains('active-style')) {
                    //when setting the height value to the value that the element should occupy + paddings in pixels => the element expands
                    this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
                }else {
                    this.nextElementSibling.style.maxHeight = '0px';
                }
            });
        });

        function hideBlock() {
            btns.forEach(btn => {
                const nextElem = btn.nextElementSibling;
                btn.classList.remove('active-style');
                nextElem.classList.remove('active-content');
                nextElem.style.maxHeight = '0px';
            });
        }
    //     blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });
    
    // btns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         //this - triggered element
    //         if (!this.classList.contains('active')) {
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });
};

export default accordion;