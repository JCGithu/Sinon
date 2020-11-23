function down_parliament(data) {
  Swal.fire({
    icon: 'success',
    title: 'Video found!',
    text: 'Nice one, get .m3u8 url or download',
    input: 'select',
    inputOptions: {
      live: 'Grab .m3u8 Code',
      normal: 'Download Past Stream',
    },
    inputPlaceholder: 'Select Quality',
    confirmButtonText: 'Run!',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: (dlquality) => {
      let quals = ['normal', 'live'];
      for (let i = 0; i < quals.length; i++) {
        if (dlquality == quals[i]) {
          order = quals[i];
          runningAlert();
          execFile(
            versionInfo.ExtractorSet,
            [
              data.URL,
              data.path,
              order,
              data.URL,
              data.geo,
              data.proxy,
              versionInfo.ffmpegPath,
              data.instaUse,
              data.instaPass,
            ],
            extractorOptions,
            (error, stdout) => {
              if (error) {
                errorAlert(error, 'download', '', swalColour, '');
              } else {
                var livestreamurl = stdout.replace('\\r/', '/');
                successAlert(quals[i], livestreamurl, swalColour);
              }
            }
          );
        }
      }
    },
  });
}

module.exports = down_parliament;
