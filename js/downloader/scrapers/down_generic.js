//FIX DATA INPUTs

function down_generic(data) {
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
      var order = 'normal';
      execFile(
        versionInfo.ExtractorSet,
        [inputURL, downloadPath, order, finalURL, geo, userProxy, versionInfo.ffmpegPath, instaUse, instaPass],
        extractorOptions,
        (error, stdout) => {
          if (error) {
            console.log('Youtube Normal Download Fail');
            errorAlert(error, 'download', '', swalColour, '');
          } else {
            var message = stdout;
            console.log('Normal Youtube Downloader Output:');
            console.log(message);
            successAlert('', '', swalColour);
          }
        }
      );
    },
  });
}

module.exports = down_generic;
