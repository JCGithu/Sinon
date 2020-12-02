const plainExec = require("../execs/plainExec");

const runningAlert = require('../../alerts/runningAlert');
const errorAlert = require('../../alerts/errorAlert');
const successAlert = require('../../alerts/successAlert');

function down_insta(data, extractorOptions) {
  let swalSet = {
    icon: 'success',
    title: 'Instagram Stories',
    text: 'Click below to download',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    preConfirm:  () => {
      runningAlert();
      plainExec(data, extractorOptions)
    },
  };
  if (data.URL.indexOf('/p/') >= 0 || data.URL.indexOf('/tv/') >= 0 ) {
    swalSet.title = 'Instagram Post';
    data.options = 'normal';
    Swal.fire(swalSet);
  } else {
    data.options = 'stories'
    usernameParse = /(?<=com\/)[A-z0-9\.\_]+(?=\/)/g
    if (data.URL.indexOf('stories') >= 0){
      usernameParse = /(?<=stories\/)[A-z0-9\.\_]+(?=\/)/g
    }
    usernames = data.URL.match(usernameParse);
    data.URL = usernames[0]
    if (data.instaUse === '' || data.instaPass === '') {
      errorAlert(
        '',
        'basic',
        'No instagram login details found in settings. Required for story downloads!',
      );
    } else {Swal.fire(swalSet)}
  }
}

module.exports = down_insta;
