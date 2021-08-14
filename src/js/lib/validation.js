import { form, submitForm, urlField, errorField } from "./../utils/elements";
import validateUrl from "./../utils/validate-URL";

/**
 * Check input for valid email on key down
 * @param      {object}   The event object
 */
// function validateEmailKeydown(event) {
//   errorField.style.visibility = !validateUrl(event.target.value) ? "visible" : "hidden";
// }

function fetchShortUrl() {
  console.log("nice short urls shown here");
}

function showErrors() {
  errorField.classList.add("js-error");
  urlField.classList.add("js-error");
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
  // urlField.addEventListener("keydown", validateEmailKeydown);
}
