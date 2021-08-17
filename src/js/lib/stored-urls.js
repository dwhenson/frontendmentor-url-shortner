import { renderHTML } from "./url-api";

export function storedUrls(urls) {
  if (!sessionStorage.getItem("urls")) return;
  const fromStorage = JSON.parse(sessionStorage.getItem("urls"));
  if (fromStorage.length > 0) {
    renderHTML(fromStorage);
  }
}

export function storeUrl(url) {
  const toStorage = sessionStorage.getItem("urls")
    ? JSON.parse(sessionStorage.getItem("urls"))
    : [];
  toStorage.push(url);
  console.log(toStorage);
  sessionStorage.setItem("urls", JSON.stringify(toStorage));
}
