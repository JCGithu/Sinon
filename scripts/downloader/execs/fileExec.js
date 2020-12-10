const axios = require('axios');
const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { progressBar } = require('../../utilities/utils');

const { execFile } = require('child_process');
const { promisify } = require('util');
const stream = require('stream');
const got = require('got');

function fileExec(data){
  runningAlert();
  if (data.URL.indexOf('.mp4') >= 0 && data.URL.indexOf('.m3u8') == 0 || data.URL.indexOf('.mp3') >= 0 && data.URL.indexOf('.m3u8') == 0) {
    console.log(data.URL);
    let fileName = /\/[^\/]+$/.exec(data.URL);
    data.path = data.path.concat(fileName.toString().replace('/', '\\'));

    const pipeline = promisify(stream.pipeline);

    (async () => {
      try {
        await pipeline(got.stream(data.URL), fs.createWriteStream(data.path));
        successAlert();
      } catch (error) {
        errorAlert(error, 'download', '');
      }
    })();
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