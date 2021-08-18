import { urlField, results, submitForm } from "./../utils/elements";
import { showErrors } from "./check-url";
import { storeUrl } from "./store-urls";

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
export function renderHTML(urls) {
  results.innerHTML += urls
    .map((url) => {
      return `
    <li class="split container">
      <p class="original">${url.original_link}</p>
      <p class="short">${url.full_short_link}</p>
      <button class="cta" aria-live="polite">Copy</button>
    </li>`;
    })
    .join("");
  // Clear the input field and focus
  urlField.value = "";
  urlField.focus();
}

/**
 * Checks the returned data and pass to render or error functions
 * @param      {object}  data    The data from the api call
 */
function checkData(data) {
  submitForm.textContent = "Shorten it!";
  if (data.ok) {
    // create and array and add the returned data
    const url = [];
    renderHTML([...url, data.result]);
    // Add the returned data to local storage
    storeUrl(data.result);
  } else {
    // If the link requested is disallowed display specific error
    showErrors(data.error);
    console.warn(data);
  }
}

/**
 * Fetches quotes from the API
 */
export function fetchShortUrl() {
  submitForm.textContent = "Shortening...";
  fetch(`https://api.shrtco.de/v2/shorten?url=${urlField.value}`)
    .then((response) => response.json())
    .then((data) => checkData(data))
    .catch((error) => fetchError(error));
}
