const runningAlert = require('../../alerts/runningAlert');
const errorAlert = require('../../alerts/errorAlert');
const successAlert = require('../../alerts/successAlert');

const { execFile } = require('child_process');

let swalInfo = {
  input: 'select',
  backdrop: swalColour.loading,
  target: document.getElementById('swalframe'),
};

function down_youtube(data, extractorOptions) {
  if (data.URL.indexOf('&list=') >= 0) {
    console.log('Playlist found');
    Swal.fire(
      Object.assign(
        {
          title: 'Playlist URL',
          text: 'Seems like this URL is part of a playlist, do you want to download the whole playlist?',
          showCancelButton: true,
          input: 'select',
          inputOptions: {
            no: 'No',
            yes: 'Why yes!',
          },
          confirmButtonText: 'Single Video',
          cancelButtonText: 'Playlist',
        },
        swalInfo
      )
    ).then((result) => {
      if (result.value == 'no') {
        data.URL = data.URL.replace(/&list=.*/g, '');
      }
      run_youtube(data, extractorOptions);
    });
  } else {
    run_youtube(data, extractorOptions);
  }
}

function run_youtube(data, extractorOptions) {
  Swal.fire(
    Object.assign(
      {
        icon: 'success',
        title: 'Video found!',
        text: 'Nice one, now click download to grab this clip',
        inputOptions: {
          normal: 'Normal Resolution',
          high: 'High Resolution',
          live: 'Grab .m3u8 Code',
        },
        inputPlaceholder: 'Select Quality',
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        preConfirm: (dlquality) => {
          let quals = ['normal', 'high', 'live'];
          for (let i = 0; i < quals.length; i++) {
            if (dlquality == quals[i]) {
              runningAlert();
              data.options = quals[i];
              execFile(
                versionInfo.ExtractorSet,
                [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass],
                extractorOptions,
                (error, stdout) => {
                  if (error) {
                    errorAlert(error, 'download', '', swalColour);
                  } else {
                    console.log(stdout);
                    successAlert(quals[i], stdout, swalColour);
                  }
                }
              );
            }
          }
        },
      },
      swalInfo
    )
  );
}

module.exports = down_youtube;
