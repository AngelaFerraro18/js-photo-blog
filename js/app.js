//salvo in una variabile il valore dell'elemento container dell'html dove andrò a inserire le cards
const photoContainerElement = document.querySelector('.container');

//integrato axios procedo con la chiamata all'api fornita
axios.get('https://lanciweb.github.io/demo/api/pictures/')
    .then(response =>{
   
        //creo una variabile con valore: stringa vuota dove andrò a inserire l'html da aggiungere al dom
        let itemPhoto = '';

        //salvo in una variabile il valore che mi identifica l'array che contiene gli oggetti forniti dall'api
        const   photoArray = response.data;

        //essendo un array uso il metodo forEach per iterare sugli elementi 
        photoArray.forEach(element => {

            //salvo in una variabile il valore che mi individua l'elemento url 
            const urlImage = element.url;

            //salvo in una variabile il valore che mi individua l'elemento title che andrò a inserire com alt dell'immagine
            const titleImage = element.title;
            
            //con la concatenazione faccio in modo di creare la parte di html da inserire nel dom 
            itemPhoto += `<div class="card-photo">
                <div class="photo">
                    <img class="img-photo" src="${urlImage}" alt="${titleImage}">
                </div>
                <h3> Repudiandae, odio asperiores consequuntur nisi minus excepturi rerum dolorum!</h3>
                <img class="pin-photo" src="img/pin.svg" alt="red-pin">
            </div>`;
            
        });

        //per mezzo di innerHTML inserisco gli elementi html creati in itemPhoto
        photoContainerElement.innerHTML = itemPhoto;
      
    })
    .catch(error =>{
        //con innerHTML vado ad inserire un paragrafo dove comunico all'utente che si è verificato un errore
        photoContainerElement.innerHTML = `<p class="error">Ops, ci deve essere stato un errore!  <i class="fa-regular fa-face-frown"></i></p>`
    })