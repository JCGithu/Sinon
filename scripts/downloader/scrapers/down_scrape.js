const runningAlert = require('../../alerts/runningAlert');
const errorAlert = require('../../alerts/errorAlert');
const plainExec = require('../execs/plainExec');

const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');

function down_scrape(data, extractorOptions) {
  Swal.fire({
    icon: 'success',
    title: 'Video found!',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    preConfirm: () => {
      runningAlert();
      console.log(data)
      scraping(data).then((data) =>{
        if (data.options == 'normal'){
          plainExec(data, extractorOptions)
        }
      })
    },
  });
}

async function urlFix (url){
  let newURL = url.replace(/\\\/|\/\\|\/\/|\\\\/g, '/').replace(':/', '://').replace(':///', '://');
  return newURL
}

function scraping(data){
  return new Promise ((resolve) => {
    if (data.proxyUse == true){
      if (data.proxy !== ''){
        fetch(data.URL, {agent: new HttpsProxyAgent('http://' + data.proxy)})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          errorAlert(err, 'download', '');
          console.log(err);
        });
      } else {
        errorAlert('', 'basic', "This site needs a proxy and I can't find one! Maybe wait a second as I may still be looking for one");
      }
    } else {
      if (data.hostname == 'abc7' || data.hostname == 'abc13'){
        data.options = 'print';
        execFile(
          versionInfo.ExtractorSet,
          [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass],
          extractorOptions,
          (error, stdout) => {
            if (error) {
              errorAlert(error, 'download', '');
            } else {
              console.log(stdout);
              successAlert(quals[i], stdout);
            }
          }
        );
      }
    }
  })
}

module.exports = down_scrape;
