import burgerMenu from "./lib/burger-menu";
import { form, results, urls } from "./utils/elements";
import { validateUrlSubmission } from "./lib/check-url";
import { storedUrls } from "./lib/store-urls";
import { copyLink } from "./lib/copy-url";

// Add novaldiate to form
form.setAttribute("novalidate", "");
// Listen for submit events and check url
form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateUrlSubmission(event);
});
// Render stored urls from session storage on page load
storedUrls(urls);
// Add delegate listener to button parent element
results.addEventListener("click", copyLink);
