const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);
  
    blocks.forEach((imageBlock) => {
       const image = imageBlock.querySelector('img'),
          text = imageBlock.querySelectorAll('p'),
          src = image.getAttribute('src');
  
       image.addEventListener('mouseover', () => {
          const hoverSrc = `${src.split('.')[0]}-1.${src.split('.')[1]}`;
  
          image.setAttribute('src', hoverSrc);
  
          text.forEach((p) => {
             if (!p.classList.contains('sizes-hit')) {
                p.style.display = 'none';
             }
          });
       });
  
       image.addEventListener('mouseout', () => {
          image.setAttribute('src', src);
          text.forEach((p) => (p.style.display = 'block'));
       });
    });
 };
  
 export default pictureSize;