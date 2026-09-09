'use strict';

const switcher = document.querySelector('.btn');

if(switcher){
    switcher.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        const className = document.body.className;
        if(className == "light-theme") {
            this.textContent = "Oscuro";
        } else {
            this.textContent = "Claro";
        }

        console.log('current class name: ' + className);
    });
}

const laMejor = document.querySelector('.la_mejor');

if (laMejor) {
    laMejor.addEventListener('click', function(){
        location.href = "graduado.html";
    });
}

const botonSi = document.querySelector('.si');
const contenedorImagen = document.querySelector('.imagen');

botonSi.addEventListener('click', function() {
    contenedorImagen.innerHTML = '<img src="./img/feliz.jpg" alt="¡Felicidades!" class="img-resultado">';
});

const botonNo = document.querySelector('.no');

botonNo.addEventListener('click', function() {
    contenedorImagen.innerHTML = '<img src="./img/triste.jpg" alt="¡Ya casi bro!" class="img-resultado">';
});

const volver = document.querySelector('.volver');

if(volver){
    volver.addEventListener('click', function(){
        location.href = "index.html"
    });
}