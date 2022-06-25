import {getResource} from "../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);
    
    let sum = 0, sizeValue = '', materialValue = '', optionsValue = '';

 
    function updateObject(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                select = target.id;
        function calcFunc(state) {
            for(let key in state[select]) {
                if (elem.value === key) {
                    switch(select) {
                        case "size":
                            sizeValue = (state[select][key]);
                            break;
                        case "material":
                            materialValue = (state[select][key]);
                            break;
                        case "options":
                            optionsValue = (state[select][key]);
                            break;
                    }
                }   
            }   

            sum = Math.round((+sizeValue) * (+materialValue) + (+optionsValue));

            if (sizeBlock.value == '' || materialBlock.value == '') {
                resultBlock.textContent = 'Выберите размер и материал картины ';
            }else if (promocodeBlock.value === "IWANTPOPART") {
                resultBlock.textContent = Math.round(sum * 0.7);
            }
            else {
                resultBlock.textContent = sum;
                if (sizeBlock.value && materialBlock.value || sizeBlock.value && materialBlock.value && promocodeBlock)
                resultBlock.textContent = sum;
            }
            
        }
      
        // if(select.getAttribute('id') == value){
        //     state[key] = block.value;
        // }

    getResource('assets/calcPrice.json')
    .then(res => {
        calcFunc(res);
    })
    .catch(e => console.error(e));
        });
    }
       updateObject('change', sizeBlock); 
       updateObject('change', materialBlock); 
       updateObject('change', optionsBlock); 
       updateObject('input', promocodeBlock); 
};

export default calc;
