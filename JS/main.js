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

let url = ``;
const buttonSearch = document.querySelector('.js-search');
const inputSearch = document.querySelector('.js-input');
let cardsList = [];
const cardContainer = document.querySelector('.js-container-cards');
const favContainer = document.querySelector('.js-container-favorites');
let favoritesList = [];

const handleAddFavorites = (event) => {
  const clickedCardId = event.currentTarget.id;
  // console.log('clickedCardId', clickedCardId);
  // console.log('cardList', cardsList);

  const cardSelected = cardsList.find((card) => {
    // console.log('card.mal_id', card.mal_id);

    return parseInt(clickedCardId) === card.mal_id;
  });
  console.log('cardSelected', cardSelected);

  favoritesList.push(cardSelected);
  console.log('favs', favoritesList);
  renderCards(favoritesList, favContainer);
};

const renderCards = (cards, containerDOM) => {
  let html = '';
  for (const card of cards) {
    if (
      card.images.jpg.image_url !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      //   console.log('hol', card.images.jpg.image_url);
      html += ` <div class="js-card" id="${card.mal_id}"><img
    src="${card.images.jpg.image_url}"
    alt="${card.title}"
  />
  <h2>${card.title}</h2></div>`;
    } else {
      html += `<div class="js-card" id="${card.mal_id}"><img
        src="https://i.redd.it/z3ldse72x7j61.png"
        alt="${card.title}"
      />
      <h2>${card.title}</h2></div>`;
    }
    containerDOM.innerHTML = html;
    const cardElements = document.querySelectorAll('.js-card');
    for (const cardElement of cardElements) {
      cardElement.addEventListener('click', handleAddFavorites);
    }
  }
};
const fetching = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cardsList = data.data;
      renderCards(cardsList, cardContainer);
    });
};

const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  url = `https://api.jikan.moe/v4/anime?q=${inputValue}`;
  fetching();
};

buttonSearch.addEventListener('click', handleSearch);
