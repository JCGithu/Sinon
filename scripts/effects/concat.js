const { progressBar, lineBreak } = require('../utilities/utils.js');
const fileSetUp = require('../utilities/fileSetUp.js');

const convertAlert = require('../alerts/convertAlert.js');
const errorAlert = require('../alerts/errorAlert.js');
const successAlert = require('../alerts/successAlert.js');

async function concat(multi, swalColour, format, targetFiles) {
  return new Promise((resolve) => {
    let ffmpegInputs = ffmpeg();
    let fileSettings, filter
    let filterNumber = '';
    var getInputs = new Promise((resolve) => {
      let i = 0;
      targetFiles.forEach(async function (fileSelected, index, array) {
        let filterStart = '-filter_complex "'
        filterNumber = filterNumber + `[${i}:v:0] [${i}:a:0] `
        let filterEnd =`concat=n=` + (i+1) + `:v=1:a=1:unsafe=1[outv][outa]`;
        filter = filterNumber + filterEnd;
        i++;
        
        fileSettings = fileSetUp(fileSelected);
        console.log(fileSettings.inputName);
        ffmpegInputs = ffmpegInputs.input(fileSettings.inputFull);
        if (index === array.length - 1) resolve();
        return ffmpegInputs;
      });
    });
    getInputs.then(() => {
      lineBreak();
      convertAlert(swalColour);
      var finalOutput = fileSettings.outputFile + '-Sinon-Joined.mp4';
      var outputFiles = [finalOutput];
      ffmpegInputs
        .on('progress', function (progress) {
          progressBar(progress, format, targetFiles);
        })
        .on('error', function (err, stdout, stderr) {
          console.log(err + stdout + stderr);
          err = err + stdout + stderr;
          errorAlert('', 'effect', err, swalColour);
        })
        .complexFilter([filter], 'outv')
        .outputOptions(['-map [outa]'])
        .output(finalOutput)
        .on('end', function () {
          console.log('Merge Success!');
          win.setProgressBar(-1);
          resolve(outputFiles);
          if (multi == false) {
            successAlert('effect', 'Clips merged', swalColour);
          }
        }).run();
    });
  });
}

module.exports = concat;
