import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const button = document.querySelector('.btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

//Рендер зображень
export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<li class="gallery-item">
  <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
  </a>
  <div class="info">
  <p class="info-item"><b>Likes:</b> <span>${image.likes}</span></p>
  <p class="info-item"><b>Views:</b> <span>${image.views}</span></p>
  <p class="info-item"><b>Comments:</b> <span>${image.comments}</span></p>
  <p class="info-item"><b>Downloads:</b> <span>${image.downloads}</span></p>
</div>
</li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

//Очищення галереї
export function clearGallery() {
  gallery.innerHTML = '';
}

//Активування лоадеру
export function showLoader() {
  loader.classList.remove('hidden');
}

//Деативування лоадеру
export function hideLoader() {
  loader.classList.add('hidden');
}

//Активування кнопки 'Load more'
export function showLoadMoreButton() {
  button.classList.remove('hidden');
}

//Деактивування кнопки 'Load more'
export function hideLoadMoreButton() {
  button.classList.add('hidden');
}
