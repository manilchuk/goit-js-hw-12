import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';
const API_KEY = '55024332-4e4fe5cdde5981dd2414e779d';
let perPage = 15;

// Запит на сервер та отримання зображень
export async function getImagesByQuery(query, page) {
  if (!query || !query.trim()) {
    throw new Error('Query cannot be empty');
  }
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
