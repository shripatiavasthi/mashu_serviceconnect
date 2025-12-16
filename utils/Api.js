import axios from 'axios';
// import Session from 'utils/Session';
import {API_URL} from '@env';

const baseUrl = API_URL;

async function get(endpointUrl) {
  const url = getUrl(endpointUrl);
  const headers = getHeaders();
  return axios
    .get(url, {headers})
    .then(function (response) {
      return {response};
    })
    .catch(function (error) {
      throw error;
    });
}
function post(endpointUrl, details = {}, config = {}) {
  const url = getUrl(endpointUrl);
  const headers = getPostHeaders();
  return axios
    .post(url, details, {headers, ...config})
    .then(function (response) {
      return {response};
    })
    .catch(function (error) {
      throw error;
    });
}
function put(endpointUrl, details = {}, config = {}) {
  const url = getUrl(endpointUrl);
  return getHeaders()
    .then(headers => axios.put(url, details, {headers, ...config}))
    .catch(handleError);
}
function getUrl(endpointUrl) {
  return `${baseUrl}${endpointUrl}`;
}
function handleError(err) {
  throw err && err.response
    ? {data: err.response.data, status: err.response.status}
    : {};
}
function getPostHeaders() {
  const headers = {
    // Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return headers;
}
function getHeaders() {
  //   return Session.get().then(token => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  return headers;
  //   });
}

export default {
  get,
  post,
  put,
};
