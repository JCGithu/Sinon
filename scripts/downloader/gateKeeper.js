const errorAlert = require('../alerts/errorAlert');
var parse = require('parse-url');
const axios = require('axios');

function gateKeeper(input) {
  return new Promise((resolve) => {
    fileExts = ['.mp4', '.mpd', '.m3u8', '.ts', '.mp4'];
    let hostname = parse(input.URL).resource.replace('www.', '').split('.')[0];
    input.hostname = hostname

    for (let i = 0; i < fileExts.length; i++) {
      if (input.URL.indexOf(fileExts[i]) >= 0) {
        input.category = 'file';
        input.proxyUse = false;
        resolve(input);
      }
    }
    
    fs.readFile(path.resolve(__dirname, './websites.json'), (err, data) => {
      if (err) throw err;
      let websites = JSON.parse(data);
      if (websites[hostname]){
        input.category = websites[hostname].category;
        input.proxyUse = websites[hostname].proxy;
      } else {
        input.category = 'generic';
      }

      resolve(input);
    });

    if (input.URL == '') {
      errorAlert('', 'basic', 'No URL inputted!');
    }
  });
}



async function statusCheck(input) {
  let i = 0;
  let proxyInfo = {}
  if (input.proxyUse == true){
    let proxyHost = input.proxy.split(':')
    proxyInfo = { proxy: {
      host: proxyHost[0], 
      port: proxyHost[1],
    }}
  }
  console.log(input.URL);

  if (input.URL.indexOf('pscp') >= 0) {
    return true
  }

  return axios.get(input.URL)
    .then(async (response) => {
      if (response.status == 200){
        return true
      } else {
        if (i > 5 || useProxy == false){
          console.log('failed');
          return false
        } else {
          proxyGenerator().then((newProxy) => {
            input.proxy = newProxy
            statusCheck()
          });
        }
      }
    }).catch((err)=>{});
}

module.exports = gateKeeper;
