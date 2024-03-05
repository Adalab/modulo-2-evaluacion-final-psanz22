'use strict';

/*
    BUSCADOR DE SERIES DE ANIME

    1. Estructura básica
        - un campo te texto y un botón para buscar series por su título
        - un listado de resultados de búsqueda donde aparece el cartel de la serie y el título

    
    2. Búsqueda
        - al hacer click (evento) sobre el botón buscar
            - hacemos fetch https://api.jikan.moe/v4/anime?q=${inputValue}, recoger input.value
            - por cada serie el resultado pinta una tarjeta con la imagen de la serie y el título
            - algunas no tienen imagen, detecta estos casos y ponles tú una imagen

    3. Favoritos
        - al hacer click(evento) sobre la card de la serie:
            - cambiar estilo indicando que es favorita
            - listado en la parte izquierda, bajo el inputSearch, con las favoritas
            - deben seguir apareciendo aunque la usuaria realice otra búsqueda
    
    4. Almacenamiento local
        - almacenar el listadoi de favoritos en el localStorage
            - al recargar la página el listado de favoritos debe mostrarse

*/

let url = `c`;
const buttonSearch = document.querySelector('.js-search');
const inputSearch = document.querySelector('.js-input');
const cardContainer = document.querySelector('.js-card');

const handleSearch = (event) => {
  let html = '';
  event.preventDefault();
  const inputValue = inputSearch.value;
  url = `https://api.jikan.moe/v4/anime?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cards = data.data;
      for (const card of cards) {
        if (
          card.images.jpg.image_url !==
          'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
        ) {
          //   console.log('hol', card.images.jpg.image_url);
          html += `<img
        src="${card.images.jpg.image_url}"
        alt="${card.title}"
      />
      <h2>${card.title}</h2>`;
        } else {
          html += `<img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.1999.co.jp%2Feng%2F10852139&psig=AOvVaw3ICK-hws-u_4rtuf1TVX8e&ust=1709716993391000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjEm6Lm3IQDFQAAAAAdAAAAABAE"
            alt="${card.title}"
          />
          <h2>${card.title}</h2>`;
        }
        cardContainer.innerHTML = html;
      }
    });
};

buttonSearch.addEventListener('click', handleSearch);
