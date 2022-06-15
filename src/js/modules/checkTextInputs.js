const checkTextInputs = (selector) => {


    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key.match(/[^а-яё 0-9]/ig)) {
                event.preventDefault();
            }
        });
        input.addEventListener('input', () => {
			if (input.value.match(/[a-z]/ig)) {
				input.value = '';
			}
        });
    });

};

export default checkTextInputs;