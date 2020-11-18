const { copyString } = require('../Utilities/utils.js');

function successAlert(passType, passText, swalColour) {
  var swalOptions = {
    icon: 'success',
    title: 'Download Success!',
    text: passText,
    backdrop: swalColour.pass,
    target: document.getElementById('swalframe'),
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
    swalOptions.title = 'Conversion Success!';
  } else if (passType == 'effect') {
    swalOptions.title = 'Effect Success!';
  } else if (passType == 'delete') {
    swalOptions.title = 'Deleted!';
  }

  Swal.fire(swalOptions);
}

module.exports = successAlert;
