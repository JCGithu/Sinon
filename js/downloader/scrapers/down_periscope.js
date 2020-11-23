function down_periscope(data) {
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
          runningAlert();
          let order = quals[i];
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
                console.log('Periscope live grab error, details:');
                error = error + stdout;
                console.log(error);
                errorAlert(error, 'download', '', swalColour, '');
                lineBreak();
              } else {
                successAlert(quals[i], stdout, swalColour);
              }
            }
          );
        }
      }
    },
  });
}

module.exports = down_periscope;
