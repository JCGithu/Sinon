const errorAlert = require('../alerts/errorAlert');
const sqlite3 = require('sqlite3').verbose();
const { knex } = require('../utilities/utils');

var parse = require('parse-url');

function gateKeeper(input) {
  return new Promise((resolve) => {
    fileExts = ['.mp4', '.mpd', '.m3u8', '.ts', '.mp4'];

    for (let i = 0; i < fileExts.length; i++) {
      if (input.URL.indexOf(fileExts[i]) >= 0) {
        input.order = 'file';
        input.proxyUse = 'check';
        resolve(input);
      }
    }

    let hostname = parse(input.URL).resource.replace('www.', '');
    console.log(hostname);

    knex('websites')
      .select('URL', 'category', 'proxy')
      .where('URL', hostname)
      .then((data) => {
        console.log('gatekeeper');
        if (data[0].category) {
          input.category = data[0].category;
          input.proxyUse = data[0].proxy;
          console.log(data);
        } else {
          input.order = 'generic';
        }
        if (input.proxyUse == true) {
          //Add proxy checker
          resolve(input);
        } else {
          resolve(input);
        }
      });

    if (input.URL == '') {
      errorAlert('', 'basic', 'No URL inputted!');
    }
  });
}

module.exports = gateKeeper;
