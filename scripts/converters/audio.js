const { lineBreak, progressBar } = require('../utilities/utils.js');
const successAlert = require('../alerts/successAlert.js');
const convertAlert = require('../alerts/convertAlert.js');
const errorAlert = require('../alerts/errorAlert.js');

async function audioConvert(convertInfo) {
  Swal.fire({
    icon: 'info',
    title: 'File format',
    text: 'What format of audio would you like to convert to?',
    input: 'select',
    inputOptions: {
      mp3: '.mp3',
      wav: '.wav',
    },
    confirmButtonText: 'Run!',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: (audioForm) => {
      convertAlert(swalColour);
      let i = -1;
      function convertTHATFILE() {
        i++;
        if (i == convertInfo.targets.length) {
          successAlert('convert', '', swalColour);
          win.setProgressBar(-1);
          lineBreak();
        } else if (i > convertInfo.targets.length) {
          return;
        } else {
          console.log(`Converting file #${i} to ${audioForm}`);
          let finalOutput = convertInfo.targets[i].output + '.' + audioForm;
          if (
            convertInfo.targets[i].ext.indexOf('.' + audioForm) >= 0 ||
            convertInfo.targets[i].ext.indexOf('.' + audioForm.toUpperCase()) >= 0
          ) {
            finalOutput = convertInfo.targets[i].output + '-SinonConverted.' + audioForm;
          }
          ffmpeg(convertInfo.targets[i].input)
            .format(audioForm)
            .noVideo()
            .on('progress', (progress) => {
              progressBar(progress, '');
            })
            .on('error', function (err, stdout, stderr) {
              err = err + stdout + stderr;
              errorAlert(err, 'convert', '');
            })
            .save(finalOutput)
            .on('end', () => {
              convertTHATFILE();
            });
        }
      }
      convertTHATFILE();
    },
  });
}

module.exports = audioConvert;
