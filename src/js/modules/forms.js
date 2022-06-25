// import checkNumInputs from './checkNumInputs';

import {postData} from "../services/requests";
import clearObject from "./clearObjects";

//use state only when we used all modal inputs
const forms = (state, result) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        resultBlock = document.querySelector(result),
        upload = document.querySelectorAll('[name="upload"]');


        // checkNumInputs('input[name="user_phone"]');
   

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо!Скоро свяжемся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

  

    const clearInputs = () => {
        inputs.forEach(form => {
            form.value = '';
        });
        upload.forEach(form => {
            form.previousElementSibling.textContent = "Файл не выбран";
        });
    };


    upload.forEach(form => {
        form.addEventListener('input', () => {
            let dots;
            const arr = form.files[0].name.split('.');
           arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            form.previousElementSibling.textContent = name;
        });
    });


    form.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.appendChild(statusMessage);

            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                form.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            let formData = new FormData(form);
            
            let api;
            
            if(form.dataset.form === "first" ) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            //if modal contain img we set api path to path designer,if no api path to path question
            form.closest('.popup-design') || form.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                        clearInputs();
                        clearObject(state);
                        document.querySelectorAll('.calc select').forEach(select => {
                            select.value = '';
                        });
                        resultBlock.textContent = 'Для расчета нужно выбрать размер и материал картины';
                    }, 5000);
                });
        });
    });
};

export default forms;