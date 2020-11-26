const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');
const { execFile } = require('child_process');

function down_skip(data, extractorOptions) {
  Swal.fire({
    icon: 'success',
    title: 'Video found!',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    preConfirm: () => {
      runningAlert();
      if (data.URL.indexOf('itv.com/hub') >= 0) {
        extractorOptions.maxBuffer = 1024 * 30720;
      }
      execFile(
        versionInfo.ExtractorSet,
        [
          data.URL,
          data.path,
          data.options,
          data.proxy,
          versionInfo.ffmpegPath,
          data.instaUse,
          data.instaPass,
        ],
        extractorOptions,
        (error) => {
          if (error) {
            console.log('Generic downloader error, details:');
            errorAlert(error, 'download', '', swalColour);
          } else {
            if (data.URL.indexOf('twitter.com') >= 0) {
              successAlert(
                '',
                'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.',
                swalColour
              );
            } else {
              successAlert('', '', swalColour);
            }
          }
        }
      );
    },
  });
}

module.exports = down_skip;
