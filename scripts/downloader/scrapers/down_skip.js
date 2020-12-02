const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');

const { execFile } = require('child_process');
const plainExec = require('../execs/plainExec');
const axios = require('axios');

function down_skip(data, extractorOptions) {
  let swalSet = {
    icon: 'success',
    title: 'Video found!',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    preConfirm:  () => {
      runningAlert();
      dataParse(data).then((data)=>{
        data.options = 'normal';
        plainExec(data, extractorOptions);
      })
    },
  };

  if (data.options == 'unlisted'){
    swalSet.icon = 'info';
    swalSet.title = 'Site not covered yet';
    swalSet.text =
      'Please forward the name of the site so it can be added. Meanwhile you can try running it through a generic extractor.';
  }

  Swal.fire(swalSet);
}

function dataParse(data){
  return new Promise((res) =>{
    if (data.URL.indexOf('itv.com/hub') >= 0) {
      extractorOptions.maxBuffer = 1024 * 30720;
    }
    res(data)
  })
}

module.exports = down_skip;
