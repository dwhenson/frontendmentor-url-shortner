import { urlField, messageField } from "./../utils/elements";
import validateUrl from "./../utils/check-url";
import { fetchShortUrl } from "./fetch-url";

/**
 * Check input for valid email on key down
 * @param      {object}   The event object
 */
function validateOnChange(event) {
  if (validateUrl(urlField.value)) {
    messageField.classList.remove("js-error");
    urlField.classList.remove("js-error");
    urlField.setAttribute("aria-invalid", false);
  }
}

/**
 * Shows the error message and highlighting
 * @param      {string}  [message="Please enter a valid url"]  The error message
 */
export function showErrors(message = "Please enter a valid url") {
  messageField.classList.add("js-error");
  urlField.classList.add("js-error");
  urlField.setAttribute("aria-invalid", true);
  messageField.textContent = message;
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
