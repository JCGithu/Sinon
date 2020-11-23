function down_file(data) {
  let parsedURL = data.URL.replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
    .replace(':/', '://')
    .replace(':///', '://');
  lineBreak();
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
      runningAlert();
      if (parsedURL.indexOf('.mp4') >= 0 || parsedURL.indexOf('.mp3') >= 0) {
        console.log(parsedURL);
        let fileName = /\/[^\/]+$/.exec(parsedURL);
        data.path = data.path.concat(fileName.toString().replace('/', '\\'));

        const pipeline = promisify(stream.pipeline);

        (async () => {
          try {
            await pipeline(got.stream(parsedURL), fs.createWriteStream(data.path));
            successAlert('', '', swalColour);
          } catch (error) {
            errorAlert(error, 'download', '', swalColour, '');
          }
        })();
      } else {
        data.order = 'normal';

        execFile(
          versionInfo.ExtractorSet,
          [
            data.URL,
            data.path,
            data.order,
            parsedURL,
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
              var message = stdout;
              console.log('Generic Downloader Output:');
              console.log(message);
              successAlert('', '', swalColour);
            }
          }
        );
      }
    },
  });
}

module.exports = down_file;
