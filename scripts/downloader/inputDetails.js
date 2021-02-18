function inputDetails() {
  const input = {
    URL: document.getElementById('inputURL').value.replace('https://', 'http://'),
    path: document.getElementById('downloadPath').value,
    proxy: document.getElementById('customProxy').value,
    //instaUse: document.getElementById('InstaUse').value,
    //instaPass: document.getElementById('InstaPass').value,
  };

  if (input.URL.indexOf('tiktok.com') >= 0) {
    input.URL = input.URL.replace(/\?lang=../gm, '');
  }
  if (input.URL.indexOf('youtu.be/') >= 0) {
    input.URL = input.URL.replace('youtu.be/', 'youtube.com/watch?v=');
  }

  return input;
}

module.exports = inputDetails;
