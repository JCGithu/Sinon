const fileExec = require('../execs/fileExec');

function down_file(data, extractorOptions) {
  let parsedURL = data.URL.replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
    .replace(':/', '://')
    .replace(':///', '://');
  data.URL = parsedURL;
  let textInput = "<a>Seems like you've put in a direct file url.<br> Would you like to download?</a>";
  Swal.fire({
    icon: 'info',
    title: 'File URL Detected',
    html: textInput,
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: () => {
      fileExec(data)
    },
  });
}

module.exports = down_file;
