import { urlField, results } from "./../utils/elements";
import { showErrors } from "./check-url-input";

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

function checkData(data) {
  if (data.ok) {
    const url = [];
    renderHTML([...url, data.result]);
  } else {
    showErrors(data.error);
    console.warn(data);
  }
}

function fetchError(error) {
  showErrors("Service is down - please try back later");
  console.warn(error);
}

/**
 * Fetches quotes from the API
 */
export function fetchShortUrl() {
  console.log("clicked");
  fetch(`https://api.shrtco.de/v2/shorten?url=${urlField.value}`)
    // fetch(`notaurl`)
    .then((response) => response.json())
    .then((data) => checkData(data))
    .catch((error) => fetchError(error));
}
