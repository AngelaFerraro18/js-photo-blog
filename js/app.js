//salvo in una variabile il valore dell'elemento container dell'html dove andrò a inserire le cards
const photoContainerElement = document.querySelector('.container');

//creo una variabile con valore: stringa vuota dove andrò a inserire l'html da aggiungere al dom
let itemPhoto = '';

//creo una variabile dove salvo il valore dell'elemento btn dell'overlay
const buttonOverlayElement = document.getElementById('btn-overlay');

//creo una variabile dove salvo il valore del div overlay
const overlayElement = document.getElementById('overlay');

//creo una variabile dove salvo il valore dell'elemento body
const overflowElement = document.querySelector('body');

//integrato axios procedo con la chiamata all'api fornita
axios.get('https://lanciweb.github.io/demo/api/pictures/')
    .then(response => {

        //salvo in una variabile il valore che mi identifica l'array che contiene gli oggetti forniti dall'api
        const photoArray = response.data;

        //essendo un array uso il metodo forEach per iterare sugli elementi 
        photoArray.forEach(element => {

            //salvo in una variabile il valore che mi individua l'elemento url 
            const urlImage = element.url;

            //salvo in una variabile il valore che mi individua l'elemento title che andrò a inserire com alt dell'immagine
            const titleImage = element.title;

            //salvo in una variabile il valore che mi individua l'elemento date che andrò a inserire sotto l'immagine
            const dateImage = element.date;

            //con la concatenazione faccio in modo di creare la parte di html da inserire nel dom 
            itemPhoto += `<div class="card-photo">
                <div class="photo">
                    <img class="img-photo" src="${urlImage}" alt="${titleImage}">
                </div>
                <span>${dateImage}</span>
                <h3>${titleImage}</h3>
                <img class="pin-photo" src="img/pin.svg" alt="red-pin">
            </div>`;

        });

        //per mezzo di innerHTML inserisco gli elementi html creati in itemPhoto
        photoContainerElement.innerHTML = itemPhoto;

        //salvo in una variabile l'elemento che mi comprende tutto l'elemento card
        const itemPhotoElement = document.querySelectorAll('.card-photo');

        //salvo in una variabile l'elemento immagine dell'overlay
        const imgOverlayElement = document.getElementById('image-overlay');

        //avendo ricavato una NodeList(che è simile ad un array) per applicare l'evento del click sulla card uso il forEach per selezionare gli elementi della NodeList ricavata precedentemente
        itemPhotoElement.forEach(item => {

            item.addEventListener('click', function () {
                //rimuovo la classe d-none per permettere la visualizzazione dell'overlay
                overlayElement.classList.remove('d-none');

                //seleziono l'elemento immagine del div contenitore della foto attraverso la classe img-photo
                const imageClicked = item.querySelector('.img-photo');

                //vado a modificare il contenuto di src dell'immagine di overlay con quello dell'immagine cliccata
                imgOverlayElement.src = imageClicked.src;

                //vado a modificare il contenuto di alt dell'immagine di overlay con quello dell'immagine cliccata
                imgOverlayElement.alt = imageClicked.alt;

                //aggiungo al body l'overflow:hidden creato in css per far in modo di bloccare lo scroll della pagina
                overflowElement.classList.add('d-overflow');
            })
        })

        //creo l'evento del click sul pulsante dell'overlay per farsì che la classe d-none venga applicata di nuovo
        buttonOverlayElement.addEventListener('click', function () {
            overlayElement.classList.add('d-none');
            imgOverlayElement.src = '';
            imgOverlayElement.alt = '';

            //rimuovo al body l'overflow:hidden creato in css per far in modo di bloccare lo scroll della pagina
            overflowElement.classList.remove('d-overflow');
        })

    })
    .catch(error => {
        //con innerHTML vado ad inserire un paragrafo dove comunico all'utente che si è verificato un errore
        photoContainerElement.innerHTML = `<p class="error">Ops, ci deve essere stato un errore!  <i class="fa-regular fa-face-frown"></i></p>`
    })




