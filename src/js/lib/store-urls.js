import { results } from "./../utils/elements";
/**
 * Check if there's session data and render if so
 */
export function storedUrls() {
  if (!sessionStorage.getItem("urls")) return;
  const fromStorage = JSON.parse(sessionStorage.getItem("urls"));
  if (fromStorage.length > 0) {
    results.innerHTML += fromStorage
      .map((url) => {
        return `
      <li class="split container">
        <p class="original">${url.original_link}</p>
        <p class="short">${url.full_short_link}</p>
        <button class="cta" aria-live="polite">Copy</button>
      </li>`;
      })
      .join("");
  }
}

/**
 * Store the url data to session storage
 * @param      {object}  url     The url object returned from the api
 */
export function storeUrl(url) {
  const toStorage = sessionStorage.getItem("urls")
    ? JSON.parse(sessionStorage.getItem("urls"))
    : [];
  toStorage.push(url);
  sessionStorage.setItem("urls", JSON.stringify(toStorage));
}
