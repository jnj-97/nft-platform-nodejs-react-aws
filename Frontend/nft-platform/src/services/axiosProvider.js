import axios from 'axios';

const defaultOptions = {};

function axiosProvider(baseUrl, options) {
  return axios.create({
    baseURL: baseUrl,
    ...defaultOptions,
    ...options
  });
}

export default axiosProvider;
