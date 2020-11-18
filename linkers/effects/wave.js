const { convertAlert } = require('../alerts/convertAlert.js');
const { errorAlert } = require('../alerts/errorAlert.js');
const { successAlert } = require('../alerts/successAlert.js');

const { lineBreak } = require('../Utilities/utils.js');
const { effectSetUp } = require('../Utilities/fileSetUp.js');

async function wave(multi, swalColour, format, targetFiles) {
  return new Promise((resolve) => {
    targetFiles.forEach(function (fileSelected) {
      let fileSettings = effectSetUp(fileSelected);
      var finalOutput = fileSettings.outputFile + '-waveform.mov';
      console.log('Final output: ', finalOutput);
      lineBreak();
      convertAlert(swalColour);
      ffmpeg(fileSelected)
        .fps(25)
        .format('mov')
        .videoCodec('png')
        .complexFilter(
          [
            'aformat=channel_layouts=mono,compand=attacks=0:points=-80/-115|-35.1/-80|-35/-35|20/20=gain=-6,showwaves=s=2000x720:mode=cline:r=25:colors=#ffffff,format=yuva420p,colorkey=0x000000:0.1:0.5[v]',
          ],
          'v'
        )
        .outputOptions(['-map 0:a'])
        .on('progress', function (progress) {
          if (progress.percent === undefined) {
            document.getElementById('progressText').textContent = progress.timemark.match('dd:dd:dd)');
          } else {
            document.getElementById('progressText').textContent =
              (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
            console.log('Processing: ' + progress.percent + '% done');
            let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
            win.setProgressBar(percentage);
          }
        })
        .on('error', function (err) {
          errorAlert('', 'effect', err, swalColour, '');
        })
        .save(finalOutput)
        .on('end', function () {
          console.log('Conversion Success!');
          resolve();
          if (multi == false) {
            successAlert('effect', 'Wave created!', swalColour);
            win.setProgressBar(-1);
          }
        });
    });
  });
}

module.exports = wave;
