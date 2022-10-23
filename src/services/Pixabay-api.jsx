import axios from 'axios';

const KEY = '29839348-b0d5a68a29b9200dfb336da94';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['X-RateLimit-Reset'] = KEY;
export async function addMaterial(query, page) {
  const params = {
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 12,
  };

  const response = await axios.get(``, {
    params,
  });
  const { totalHits, hits } = response.data;
  //! endOfCollection - это цифра еще НЕ ПРОСМОТРЕННЫХ элементов коллекции
  const endOfCollection = totalHits - page * params.per_page;
  const all = { totalHits, hits, endOfCollection };
  return all;
}
