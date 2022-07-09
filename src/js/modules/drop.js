
const drop = () => {  
    const fileInputs = document.querySelectorAll('[name="upload"]');
      
    //massive of events

['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
        input.addEventListener(eventName, preventDefaults, false);
    });
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(item) {
    item.closest('.file_upload').style.border = "5px solid yellow";
    item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
}

function unhighlight(item) {
    item.closest('.file_upload').style.border = "none";
    if (item.closest('.calc_form')) {
        item.closest('.file_upload').style.backgroundColor = "#fff";
    } else {
        item.closest('.file_upload').style.backgroundColor = "#ededed";
    }
    if(item.closest('.main')) {
        item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
    }
}

    //2 events 
['dragenter', 'dragover'].forEach(eventName => {
     //enumeration all file inputs we work with
    fileInputs.forEach(input => {
     // on every input add event and set the handler
        input.addEventListener(eventName, () => highlight(input), false);
    });
});

['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
        input.addEventListener(eventName, () => unhighlight(input), false);
    });
});


const clearInput = () => {
    const unloadedFile =  document.querySelector('.file-unloaded');
     fileInputs.forEach(unloadedFile => {
      unloadedFile.value = '';
     }) ;
     fileInputs.forEach(unloadedFile => {
      unloadedFile.previousElementSibling.textContent = "Файл не выбран";
     });
  };

fileInputs.forEach(input => {
    input.addEventListener('drop', (e) => {
        input.files = e.dataTransfer.files;
        let dots;
        const arr = input.files[0].name.split('.');

        arr[0].length > 6 ? dots = "..." : dots = '.';
        const name = arr[0].substring(0, 6) + dots + arr[1];
        input.previousElementSibling.textContent = name;
        if (input.closest('main')) {
 
            const formData = new FormData();
            formData.append('file', input.files[0]);
            
            const postData = async (url, data) => {
                let res = await fetch(url, {
                    method: "POST",
                    body: data
                });
                return await res.text();
            };
            postData('assets/server.php', formData)
                .then(res => console.log(res))
                .catch(() => console.log('Ошибка'));
        } 
        clearInput();   
    });
});
};

export default drop;