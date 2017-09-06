import './fetch-min.js';
var baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = ''; // 这个为空就好了
} else {
  baseUrl = ''; // 这个设置成后台的域名
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(baseUrl + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }))
    .catch((err) => ({
      err
    }));
}
