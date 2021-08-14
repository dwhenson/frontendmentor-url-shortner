import burgerMenu from "./lib/burger-menu";
import { form } from "./utils/elements";
import { validateUrlSubmission } from "./lib/validation";
import BurgerMenu from "./lib/burger-menu";

// Add novaldiate to form
form.setAttribute("novalidate", "");
// Listen for submit events and check url
form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateUrlSubmission(event);
});
