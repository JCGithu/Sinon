const runningAlert = require('../../alerts/runningAlert');
const errorAlert = require('../../alerts/errorAlert');
const plainExec = require('../execs/plainExec');
const axios = require('axios');

function down_mp4(data, extractorOptions) {
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
        data.options = 'normal';
        plainExec(data, extractorOptions)
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
    proxyAxios(data).then((axiosOpts) => {
      axios
      .get(data.URL, axiosOpts)
      .then(async (response, error) => {
        var regex = /[0-9A-Za-z\/\.\-\:\_\\\-]+.\.mp4/g
        var videoURLS = response.data.match(regex);
        var tempURL = await urlFix(videoURLS[0])
        if (data.URL.includes('metro.co.uk')){
          tempURL = tempURL.replace("640x360", "1024x576").replace("960x540", "1024x576").replace("480x270", "1024x576")
        }
        data.URL = tempURL
        resolve(data);
    }).catch((error)=>{
      errorAlert(error, '', '');
    })
    })
  })
}

function proxyAxios(data){
  return new Promise((res)=>{
    let axiosOpts = {}
    if (data.proxyUse == true){
      let proxyHost = data.proxy.split(':')
      console.log(proxyHost)
      axiosOpts.proxy = {
        host: 'https://' + proxyHost[0], 
        port: proxyHost[1],
      }
      
    }
    res(axiosOpts)
  })
}

module.exports = down_mp4;
