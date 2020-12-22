const plainExec = require('../execs/plainExec');
const { execFile } = require('child_process');

const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

function down_facebook(data, extractorOptions) {
  let swalSet = {
    icon: 'success',
    title: 'Video found!',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    preConfirm: () => {
      runningAlert();
      dataParse(data, extractorOptions).then((data) => {
        data.options = 'normal';
        plainExec(data, extractorOptions);
      });
    },
  };

  if (data.URL.indexOf('live') >= 0) {
    swalSet.icon = 'info';
    swalSet.title = 'Livestream found';
    swalSet.text = 'Copy .m3u8 code?';
    data.options = 'live';
    swalSet.preConfirm = () => {
      execFile(
        versionInfo.ExtractorSet,
        [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass],
        extractorOptions,
        (error, stdout) => {
          if (error) {
            errorAlert(error, 'download', '');
          } else {
            console.log(stdout);
            successAlert(quals[i], stdout);
          }
        }
      );
    };
  }

  Swal.fire(swalSet);
}

module.exports = down_facebook;
