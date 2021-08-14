import { urlField, results } from "./../utils/elements";
// import { showErrors } from "./check-url-input";

// const endpoint = "https://api.shrtco.de/v2/shorten/?url=";
const endpoint = "https://api.shrtco.de/v2/shorten?url=";

/**
 * Checks response.ok, if true, converts to json (else throws an error)
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

function renderHTML(url) {
  results.innerHTML = `
    <li class="split container">
      <p class="original">${url.original_link}</p><p class="short">${url.full_short_link}</p><button class="cta">Copy</button>
    </li>
  `;
}

/**
 * Fetches quotes from the API
 */
export async function fetchShortUrl(url) {
  const response = await fetch(`${endpoint}${urlField.value}`);
  const data = await checkResponse(response);
  renderHTML(data.result);
  console.log(data.result);
}
