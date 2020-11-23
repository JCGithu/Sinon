function down_insta(data) {
  if (message.indexOf('/p/') >= 0) {
    Swal.fire({
      icon: 'success',
      title: 'Instagram Post',
      text: 'Click below to download',
      showCancelButton: true,
      confirmButtonText: 'Download',
      showLoaderOnConfirm: true,
      backdrop: swalColour.loading,
      preConfirm: () => {
        runningAlert();
        var order = 'normal';
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
          (error, stdout, stderr) => {
            if (error) {
              console.log('Instagram downloader error, details:');
              errorAlert(error, 'download', '', swalColour, '');
            } else {
              var message = stdout;
              console.log('Instagram extractor print out:');
              console.log(message);
              successAlert('', '', swalColour);
            }
          }
        );
      },
    });
  } else {
    console.log('itsa story');
    if (instaUse === '' || instaPass === '') {
      console.log('Error Code 006: No Instagram Details');
      errorAlert(
        '',
        'basic',
        'No instagram login details found in settings. Required for story downloads!',
        swalColour,
        ''
      );
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Instagram Story found!',
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        preConfirm: () => {
          runningAlert();

          var order = 'stories';

          var finalURL = inputURL.replace(/\/\?hl=../gm, '');

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
            (error, stdout, stderr) => {
              if (error) {
                console.log('Stories downloader error, details:');
                errorAlert(error, 'download', '', swalColour, '');
              } else {
                var message = stdout;
                console.log('Stories extractor print out:');
                console.log(message);
                successAlert('', '', swalColour);
              }
            }
          );
        },
      });
    }
  }
}

module.exports = down_insta;
