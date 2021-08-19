/**
 * Checks if a url is valid
 * @param      {string}   The email
 * @return     {boolean}  The result of the test
 */
export function validateUrl(url) {
  return /[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/.test(url);
}
