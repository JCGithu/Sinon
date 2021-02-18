const successAlert = require('../../alerts/successAlert');
const runningAlert = require('../../alerts/runningAlert');
const errorAlert = require('../../alerts/errorAlert');

const plainExec = require('../execs/plainExec');
const { execFile } = require('child_process');

const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const fileExec = require('../execs/fileExec');

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
      scraping(data, extractorOptions).then((data) => {
        fileExec(data);
      });
    },
  });
}

async function urlFix(url) {
  let newURL = url
    .replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
    .replace(':/', '://')
    .replace(':///', '://');
  return newURL;
}

function scraping(data, extractorOptions) {
  return new Promise((resolve) => {
    if (data.proxyUse == true) {
      if (data.proxy !== '') {
        fetch(data.URL, { agent: new HttpsProxyAgent('http://' + data.proxy) })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            errorAlert(err, 'download', '');
            console.log(err);
          });
      } else {
        errorAlert(
          '',
          'basic',
          "This site needs a proxy and I can't find one! Maybe wait a second as I may still be looking for one"
        );
      }
    } else {
      data.options = 'print';
      execFile(
        versionInfo.ExtractorSet,
        [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass],
        extractorOptions,
        (error, stdout) => {
          if (error) {
            errorAlert(error, 'download', '');
          } else {
            let sources = stdout
              .replace('[', '')
              .replace(']', '')
              .split(/(?<=}),/g);
            console.log(sources);
            let value = 0;
            for (let i = 0; i <= sources.length; i++) {
              console.log(sources[i]);
              let lastChars = sources[i].slice(-2);
              let source = sources[i];
              if (lastChars !== '}}') {
                source = sources[i] + '}';
              }
              let videoData = JSON.parse(source);
              if (videoData.height > value) {
                data.URL = videoData.url;
              }
              if (i == sources.length) {
                resolve(data);
              }
            }
          }
        }
      );
    }
  });
}

module.exports = down_scrape;
