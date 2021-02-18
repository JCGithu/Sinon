var { copyString } = require('../utilities/utils.js');

function successAlert(passType, passText) {
  var swalOptions = {
    icon: 'success',
    title: 'Download Success!',
    confirmButtonText: 'Done',
    text: passText,
    backdrop: swalColour.pass,
    target: document.getElementById('swalframe'),
    preConfirm: () => {},
  };

  if (passType == 'live') {
    console.log('This livestream URL was found:');
    console.log(passText);
    swalOptions.title = 'Code found!';
    swalOptions.text = '';
    swalOptions.confirmButtonText = 'Copy to Clipboard';
    swalOptions.preConfirm = () => {
      copyString(passText.replace(/(\r\n|\n|\r)/gm, '').replace(' ', ''));
    };
  } else if (passType == 'convert') {
    console.log('Convert success!');
    swalOptions.title = 'Conversion Success!';
  } else if (passType == 'effect') {
    console.log('Effect success!');
    swalOptions.title = 'Effect Success!';
  } else if (passType == 'delete') {
    console.log('File deleted!');
    swalOptions.title = 'Deleted!';
  } else if (passType == 'normal' || passType == 'high') {
    swalOptions.text = 'Video downloaded';
  }

  Swal.fire(swalOptions);
}

module.exports = successAlert;
