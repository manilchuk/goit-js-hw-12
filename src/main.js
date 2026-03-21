import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const button = document.querySelector('.btn');
let queryValue = '';

form.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleClick);

let page = 1;

//Додавання наступних сторінок
async function handleClick() {
  hideLoadMoreButton();
  showLoader();

  try {
    page += 1;
    const data = await getImagesByQuery(queryValue, page);

    createGallery(data.hits);

    //Скролл
    const card = document.querySelector('.gallery-item');
    if (card) {
      const { height: cardHeight } = card.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalLoaded = document.querySelectorAll('.gallery-item').length;

    if (totalLoaded >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

//Обробка форми запиту зображень
async function handleSubmit(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();
  queryValue = query;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    page = 1;
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const totalLoaded = document.querySelectorAll('.gallery-item').length;

    if (totalLoaded < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    event.target.elements['search-text'].select();
  }
}
