const runningAlert = require('../../alerts/runningAlert');
const plainExec = require("../execs/plainExec");

function down_generic(data, extractorOptions) {
  Swal.fire({
    icon: 'error',
    title: 'Site not covered yet',
    text:
      'Please forward the name of the site so it can be added. Meanwhile you can try running it through a generic extractor.',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    toast: false,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: () => {
      runningAlert();
      data.options = 'normal';
      plainExec(data, extractorOptions)
    },
  });
}

module.exports = down_generic;
