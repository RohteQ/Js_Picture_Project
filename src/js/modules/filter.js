const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');

        //markType= collection of elements
    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });
        
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
        else if(markType.length == 0) {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    menu.addEventListener('click', (e) => {
        let classSelect = e.target.classList[0];
        let allElems = wrapper.querySelectorAll(`.${classSelect}`);
        typeFilter(allElems);
      });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
};


export default filter;
