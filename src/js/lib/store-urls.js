import { renderHTML } from "./fetch-url";

/**
 * Check if there's session data and render if so
 */
export function storedUrls() {
  if (!sessionStorage.getItem("urls")) return;
  const fromStorage = JSON.parse(sessionStorage.getItem("urls"));
  if (fromStorage.length > 0) {
    renderHTML(fromStorage);
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
