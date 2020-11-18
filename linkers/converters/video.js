const { lineBreak, progressBar } = require('../Utilities/utils.js');

const { successAlert } = require('../alerts/successAlert.js');
const { convertAlert } = require('../alerts/convertAlert.js');
const { errorAlert } = require('../alerts/errorAlert.js');

async function videoConvert(convertInfo, swalColour) {
  let swalSet = {
    icon: 'info',
    input: 'select',
    confirmButtonText: 'Run!',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
  };

  Swal.fire(
    Object.assign(
      {
        title: 'File format',
        text: 'What format of video would you like to convert to?',
        inputOptions: {
          mp4: '.mp4',
          mov: '.mov',
          avi: '.avi',
          webm: '.webm',
        },
        preConfirm: (videoForm) => {
          Swal.fire(
            Object.assign(
              {
                title: 'Convert, how?',
                text:
                  'Remuxing is significantly faster for some formats (MKV, MOV, etc), however may lose additional audio and subtitle tracks',
                inputOptions: {
                  convert: 'Convert',
                  remux: 'Remux',
                },
                preConfirm: (videoConv) => {
                  convertAlert(swalColour);
                  let i = 0;
                  function convertTHATFILE() {
                    lineBreak();
                    console.log(convertInfo.targets[i]);
                    console.log(i);
                    let finalOutput = convertInfo.targets[i].output + '.' + videoForm;
                    if (
                      convertInfo.targets[i].ext.indexOf('.' + videoForm) >= 0 ||
                      convertInfo.targets[i].ext.indexOf('.' + videoForm.toUpperCase()) >= 0
                    ) {
                      finalOutput = convertInfo.targets[i].output + '-SinonConverted.' + videoForm;
                    }
                    console.log('Final output: ', finalOutput);
                    var runMP4 = ffmpeg(convertInfo.targets[i].input);
                    if (videoConv == 'convert') {
                      runMP4.format(videoForm);
                      runMP4.save(finalOutput);
                    } else {
                      runMP4.videoCodec('copy');
                      runMP4.audioCodec('aac');
                      runMP4.outputOptions(['-map 0:v', '-map 0:a:?']);
                      runMP4.output(finalOutput);
                    }
                    runMP4
                      .on('error', (err, stdout, stderr) => {
                        err = err + stdout + stderr;
                        errorAlert(err, 'convert', '', swalColour, '');
                      })
                      .on('progress', (progress) => {
                        progressBar(progress, '');
                      })
                      .on('end', () => {
                        console.log('finished!');
                        win.setProgressBar(-1);
                        i++;
                        if (i >= convertInfo.targets.length - 1) {
                          successAlert('convert', '', swalColour);
                        } else {
                          convertTHATFILE();
                        }
                      })
                      .run();
                  }
                  convertTHATFILE();
                },
              },
              swalSet
            )
          );
        },
      },
      swalSet
    )
  );
}

module.exports = videoConvert;
