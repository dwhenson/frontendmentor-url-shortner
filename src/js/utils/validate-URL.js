/**
 * Checks if a url is valid
 * @param      {string}   The email
 * @return     {boolean}  The result of the test
 */
export default function validateUrl(url) {
  return /https?:\/\/(www\.)?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/.test(
    url
  );
}
