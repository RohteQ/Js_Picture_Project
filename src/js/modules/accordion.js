const accordion = (triggersSelector, itemsSelector) => {
    //2 options -css or next sibling  

    const btns = document.querySelectorAll(triggersSelector),
        blocks = document.querySelectorAll(itemsSelector);
    // 1st option
    blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown');
    });
    
    btns.forEach(btn => {
        btn.addEventListener('click', function(e){
            //this - triggered element
            if (!this.classList.contains('active')) {
                btns.forEach(btn => {
                    btn.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
            }
        });
    });
};

export default accordion;