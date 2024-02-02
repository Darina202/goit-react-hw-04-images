import axios from 'axios';

const API_KEY = '41017766-9f085fc310f3820f85afb105c';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const getPictures = (q, page = 1) => {
  return instance.get('/', {
    params: {
      q,
      page,
    },
  });
};
