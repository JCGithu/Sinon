const { lineBreak } = require('../utilities/utils');

function inputDetails() {
  const input = {
    URL: document.getElementById('inputURL').value,
    path: document.getElementById('downloadfolder').value,
    proxy: document.getElementById('proxyInput').value,
    instaUse: document.getElementById('InstaUse').value,
    instapass: document.getElementById('InstaPass').value,
  };
  console.log(input);

  if (input.URL.indexOf('tiktok.com') >= 0) {
    input.URL = input.URL.replace(/\?lang=../gm, '');
  }
  if (input.URL.indexOf('youtu.be/') >= 0) {
    input.URL = inputURL.replace('youtu.be/', 'youtube.com/watch?v=');
  }

  return input;
}

module.exports = inputDetails;
