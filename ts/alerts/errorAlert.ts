var { copyString } = require('../utilities/utils.js');

function errorAlert(error, errorType, errorText, swalColour) {
  let instaUse: HTMLElement | null = document.getElementById('instaUse');
  let instaPass: HTMLElement | null = document.getElementById('instaPass');
  error = error.toString().replace(instaPass.value, '').replace(instaUse.value, '');
  console.log(error);

  var swalOptions = {
    icon: 'error',
    title: 'Error!',
    backdrop: swalColour.fail,
    text: 'Something went wrong. Please send error code and info.',
    toast: false,
    target: document.getElementById('swalframe'),
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Copy Error Code',
    preConfirm: () => {
      copyString(error);
    },
  };

  if (errorType == 'download') {
    swalOptions.title = 'Downloader Error!';
  } else if (errorType == 'proxy') {
    swalOptions.title = 'Proxy error!';
  } else if (errorType == 'effect') {
    swalOptions.title = 'Effect error!';
  } else if (errorType == 'convert') {
    swalOptions.title = 'Conversion error!';
  } else if (errorType == 'basic') {
    swalOptions.text = errorText;
    swalOptions.showCancelButton = false;
    swalOptions.confirmButtonText = 'Close';
    swalOptions.preConfirm = () => {};
  }

  Swal.fire(swalOptions);
}

module.exports = errorAlert;
