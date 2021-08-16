import { urlField, errorField } from "./../utils/elements";
import validateUrl from "./../utils/validate-url";
import { fetchShortUrl } from "./url-api";

/**
 * Check input for valid email on key down
 * @param      {object}   The event object
 */
function validateOnChange(event) {
  if (validateUrl(urlField.value)) {
    errorField.classList.remove("js-error");
    urlField.classList.remove("js-error");
  }
}

export function showErrors(message = "Please enter a valid url") {
  errorField.classList.add("js-error");
  urlField.classList.add("js-error");
  errorField.textContent = message;
  urlField.focus();
}

/**
 * Check input for valid email on form submission
 * @param      {object}   The event object
 */
export function validateUrlSubmission(event) {
  if (!validateUrl(urlField.value)) {
    showErrors();
  } else {
    fetchShortUrl();
  }
  urlField.addEventListener("input", validateOnChange);
}
