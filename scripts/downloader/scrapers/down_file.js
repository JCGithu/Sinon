const axios = require('axios');
const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { progressBar } = require('../../utilities/utils');

const { execFile } = require('child_process');
const { promisify } = require('util');
const stream = require('stream');
const got = require('got');

function down_file(data, extractorOptions) {
  let parsedURL = data.URL.replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
    .replace(':/', '://')
    .replace(':///', '://');
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
      if (parsedURL.indexOf('.mp4') >= 0 && parsedURL.indexOf('.m3u8') == 0 || parsedURL.indexOf('.mp3') >= 0 && parsedURL.indexOf('.m3u8') == 0) {
        console.log(parsedURL);
        let fileName = /\/[^\/]+$/.exec(parsedURL);
        data.path = data.path.concat(fileName.toString().replace('/', '\\'));

        const pipeline = promisify(stream.pipeline);

        (async () => {
          try {
            await pipeline(got.stream(parsedURL), fs.createWriteStream(data.path));
            successAlert('', '', swalColour);
          } catch (error) {
            errorAlert(error, 'download', '');
          }
        })();
      } else {
        outputFormat = data.path + '/' + data.hostname + '.mp4';
        ffmpeg(parsedURL)
        .format('mp4')
        .save(outputFormat)
        .on('error', (err, stdout, stderr) => {
          err = err + stdout + stderr;
          errorAlert(err, 'convert', '');
        })
        .on('progress', (progress) => {
          progressBar(progress, '');
        })
        .on('end', () => {
          successAlert('', '', swalColour);
        })
        .run();
      }
    },
  });
}

module.exports = down_file;
