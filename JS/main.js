'use strict';

let url = ``;
const buttonSearch = document.querySelector('.js-search');
const buttonReset = document.querySelector('.js-reset');
const inputSearch = document.querySelector('.js-input');
let cardsList = [];
const cardContainer = document.querySelector('.js-container-cards');
const favContainer = document.querySelector('.js-container-favorites');
let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

const handleAddFavorites = (event) => {
  const clickedCardId = event.currentTarget.id;

  const cardSelected = cardsList.find((card) => {
    return parseInt(clickedCardId) === card.mal_id;
  });
  const cardIndex = favoritesList.findIndex((card) => {
    return parseInt(clickedCardId) === card.mal_id;
  });
  if (cardIndex === -1) {
    favoritesList.push(cardSelected);
    event.currentTarget.classList.add('fav');
  } else {
    favoritesList.splice(cardIndex, 1);
    event.currentTarget.classList.remove('fav');
  }
  localStorage.setItem('favorites', JSON.stringify(favoritesList));

  renderCards(favoritesList, favContainer);
};
const localStorageFavorites = JSON.parse(localStorage.getItem('favorites'));

const renderCards = (cards, containerDOM) => {
  let html = '';
  for (const card of cards) {
    let isFavorite = false;
    for (const favorite of favoritesList) {
      if (favorite.mal_id === card.mal_id) {
        isFavorite = true;
        break;
      }
    }
    const isFavoritesContainer = containerDOM === favContainer;
    if (
      card.images.jpg.image_url !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += ` 
      <div class="js-card ${
        isFavorite && !isFavoritesContainer ? 'fav' : ''
      }" id="${card.mal_id}"><img
      src="${card.images.jpg.image_url}"
      alt="${card.title}"
      />
      <h4>${card.episodes} episodes</h4>
      <h3>${card.title}</h3></div>`;
    } else {
      html += `
      <div class="js-card ${
        isFavorite && !isFavoritesContainer ? 'fav' : ''
      }" id="${card.mal_id}"><img
        src="https://i.redd.it/dtljzwihuh861.jpg"
        alt="${card.title}"
      />
      <h4>${card.episodes} episodes</h4>
      <h3>${card.title}</h3></div>`;
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

renderCards(localStorageFavorites, favContainer);

const handleReset = () => {
  localStorage.removeItem('favorites');
  favoritesList = [];
};

buttonReset.addEventListener('click', handleReset);
