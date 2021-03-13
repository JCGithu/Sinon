const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { progressBar } = require('../../utilities/utils');

const { execFile } = require('child_process');
const fetch = require('node-fetch');

async function fileExec(data) {
  runningAlert();
  console.log('file exec');
  if (
    (data.URL.indexOf('.mp4') >= 0 && data.URL.indexOf('.m3u8') < 0) ||
    (data.URL.indexOf('.mp3') >= 0 && data.URL.indexOf('.m3u8') < 0)
  ) {
    console.log(data.URL);
    let filetype = '.mp4';
    if (data.URL.indexOf('.mp3') >= 0) {
      filetype = '.mp3';
    }
    let fileName = `${data.hostname}`;
    const response = await fetch(data.URL);
    const buffer = await response.buffer();

    async function downloader() {
      fs.writeFile(`${data.path}\\${fileName}${filetype}`, buffer, () => {});
    }

    downloader()
      .catch((error) => {
        errorAlert(error, 'download', '');
      })
      .then(() => {
        successAlert();
      });
  } else {
    outputFormat = data.path + '/' + data.hostname + '.mp4';
    ffmpeg(data.URL)
      .format('mp4')
      .save(outputFormat)
      .on('error', (err, stdout, stderr) => {
        err = err + stdout + stderr;
        errorAlert(err, 'download', '');
      })
      .on('progress', (progress) => {
        progressBar(progress, '');
      })
      .on('end', () => {
        successAlert();
      })
      .run();
  }
}

module.exports = fileExec;
