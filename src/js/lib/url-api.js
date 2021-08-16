import { urlField, results } from "./../utils/elements";
import { showErrors } from "./check-url-input";

/**
 * Renders an error if the api call fails to reach the endpoint
 * @param      {object}  error   The error object
 */
function fetchError(error) {
  showErrors("Service is down - please try back later");
  console.warn(error);
}

/**
 * Renders the url to the page
 * @param      {array}  urls    The urls to render
 */
function renderHTML(urls) {
  results.innerHTML += urls
    .map((url) => {
      return `
    <li class="split container">
      <p class="original">${url.original_link}</p>
      <p class="short">${url.full_short_link}</p>
      <button class="cta">Copy</button>
    </li>`;
    })
    .join("");
}

/**
 * Checks the returned data and pass to render or error functions
 * @param      {object}  data    The data from the api call
 */
function checkData(data) {
  if (data.ok) {
    const url = [];
    renderHTML([...url, data.result]);
  } else {
    showErrors(data.error);
    console.warn(data);
  }
}

/**
 * Fetches quotes from the API
 */
export function fetchShortUrl() {
  console.log("clicked");
  fetch(`https://api.shrtco.de/v2/shorten?url=${urlField.value}`)
    .then((response) => response.json())
    .then((data) => checkData(data))
    .catch((error) => fetchError(error));
}
