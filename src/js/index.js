import burgerMenu from "./lib/burger-menu";
import { form, urls } from "./utils/elements";
import { validateUrlSubmission } from "./lib/check-url-input";
import { storedUrls } from "./lib/stored-urls";
// import { storedUrls } from "./lib/stored-urls";

// Add novaldiate to form
form.setAttribute("novalidate", "");
// Listen for submit events and check url
form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateUrlSubmission(event);
});
// Render stored urls from browser session
// storedUrls(urls);
storedUrls(urls);
