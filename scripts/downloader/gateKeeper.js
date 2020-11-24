const errorAlert = require('../alerts/errorAlert');
var parse = require('parse-url');
const axios = require('axios');

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

    let hostname = parse(input.URL).resource.replace('www.', '').split('.')[0];
    fs.readFile('./scripts/downloader/websites.json', (err, data) => {
      if (err) throw err;
      let websites = JSON.parse(data);
      if (websites[hostname]){
        input.category = websites[hostname].category;
        input.proxyUse = websites[hostname].proxy;
      } else{
        input.order = 'generic';
      }
      if (input.proxyUse == true) {
        statusCheck().then((worked)=>{
          if (worked){
            resolve(input);
          } else {
            errorAlert('', 'basic', "Proxy error, can't reach site!");
          }
        })
      } else {
        resolve(input);
      }
    });

    if (input.URL == '') {
      errorAlert('', 'basic', 'No URL inputted!');
    }
  });
}



async function statusCheck() {
  let i = 0;
  let proxyHost = input.proxy.split(':')
  axios.get(input.URL, { proxy: {
    host: proxyHost[0], 
    port: proxyHost[1],
  }})
  .then(async (response) => {
    if (response.status == 200){
      return true
    } else {
      if (i > 5){
        return false
      } else {
        proxyGenerator().then((newProxy) => {
          input.proxy = newProxy
          statusCheck()
        });
      }
    }
  });
}

module.exports = gateKeeper;
