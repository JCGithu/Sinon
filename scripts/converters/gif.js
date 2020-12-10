const convertAlert = require('../alerts/convertAlert.js');
const successAlert = require('../alerts/successAlert.js');
const { lineBreak, progressBar } = require('../utilities/utils.js');

const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

async function gifConvert(convertInfo) {
  Swal.fire({
    icon: 'info',
    title: 'Settings',
    text: 'Basic or advanced settings?',
    input: 'select',
    inputOptions: {
      basic: 'Basic',
      advanced: 'Advanced',
    },
    confirmButtonText: 'Run!',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: (gifQual) => {
      if (gifQual == 'basic') {
        let basicVal = {
          value: ['hLow', 'Mid', '12', 'None', '0'],
        };
        gifRun(basicVal, convertInfo);
      } else {
        Swal.mixin({
          confirmButtonText: 'Next &rarr;',
          progressSteps: ['1', '2', '3', '4', '5'],
          backdrop: swalColour.loading,
          target: document.getElementById('swalframe'),
        })
          .queue([
            {
              title: 'Resolution',
              text: 'Please choose the resolution of your GIF',
              input: 'select',
              inputOptions: {
                high: '1080p',
                hMid: '720p',
                lMid: '480p',
                hLow: '360p',
                low: '240p',
              },
            },
            {
              title: 'Colour Quality',
              text: 'Please choose the colour space of your GIF',
              input: 'select',
              inputOptions: {
                High: 'High / 256',
                Mid: 'Normal / 128',
                Low: 'Optimised / 64',
              },
            },
            {
              title: 'Frame Rate',
              text: 'Please choose your fps',
              input: 'range',
              inputAttributes: {
                min: '1',
                max: '60',
                step: '1',
              },
              inputValue: 25,
            },
            {
              title: 'Crop',
              text: 'Do you want to crop the GIF?',
              input: 'select',
              inputOptions: {
                None: 'No',
                Wide: 'Widescreen',
                Square: 'Square',
                Vertical: 'Vertical',
                Two: '2:1',
              },
            },
            {
              title: 'Compression',
              text: 'Please your compression rate </br> Please note this will increase conversion time.',
              input: 'range',
              inputAttributes: {
                min: '0',
                max: '100',
                step: '1',
              },
              inputValue: 50,
            },
          ])
          .then((result) => {
            gifRun(result, convertInfo);
          });
      }
    },
  });
}

function gifRun(result, convertInfo) {
  convertAlert();
  let i = -1;
  function convertTHATFILE() {
    i++;
    if (i == convertInfo.targets.length) {
      console.log(i);
      successAlert('convert');
      win.setProgressBar(-1);
      console.log('finished!');
      lineBreak();
    } else if (i > convertInfo.targets.length) {
      return;
    } else {
      console.log(convertInfo.targets[i]);
      console.log(i);
      console.log('gif running');
      console.log(result);
      if (result.value) {
        let opti = true;
        let rez = ['high', 'hMid', 'lMid', 'hLow', 'low'];
        let rezRange = [1080, 720, 480, 360, 240];
        let qual = ['High', 'Mid', 'Low'];
        let qualRange = [256, 128, 64];
        let crop = ['None', 'Wide', 'Square', 'Vertical', 'Two'];
        let cropRange = [
          'w=iw',
          "'in_w:if(lt(in_w,in_h),in_w*(9/16),in_h)'",
          "'if(lt(in_h,in_w),in_h,in_w):if(lt(in_w,in_h),in_w,in_h)'",
          'w=ih*(9/16)',
          'h=iw*0.5',
        ];

        let finalOutput = convertInfo.targets[i].output + '.gif';
        if (convertInfo.targets[i].ext.indexOf('.gif') >= 0) {
          finalOutput = convertInfo.targets[i].output + '-SinonConverted.gif';
        }
        let OptimalOutput = convertInfo.targets[i].output + '_advanced.gif';

        async function getOptions() {
          return new Promise((resolve) => {
            let gifOptions = {};
            gifOptions.fps = result.value[2];
            if (result.value[4] == 0) {
              opti = false;
            }
            gifOptions.lossy = '--lossy=' + result.value[4];
            for (let i = 0; i < rez.length + 1; i++) {
              if (result.value[0] == rez[i]) {
                gifOptions.resolution = `[frames]scale=w=trunc(oh*a/2)*2:h=${rezRange[i]}[rescaled]`;
              }
              if (result.value[1] == qual[i]) {
                gifOptions.colour = `--colors=${qualRange[i]}`;
              }
              if (result.value[3] == crop[i]) {
                gifOptions.crop = `[rescaled]crop=${cropRange[i]}[cropped]`;
              }
              if (i == rez.length) {
                resolve(gifOptions);
              }
            }
          });
        }
        getOptions().then((gifOptions) => {
          console.log(gifOptions);
          ffmpeg(convertInfo.targets[i].input)
            .format('gif')
            .fps(gifOptions.fps)
            .complexFilter(['[0:v]mpdecimate[frames]', gifOptions.resolution, gifOptions.crop], 'cropped')
            .on('progress', (progress) => {
              progressBar(progress, '');
            })
            .save(finalOutput)
            .on('end', () => {
              if (opti) {
                document.getElementById('progressText').textContent = 'Optimising';
                execFile(
                  gifsicle,
                  ['-o', OptimalOutput, gifOptions.lossy, '-O3', gifOptions.colour, finalOutput],
                  () => {
                    fs.unlink(finalOutput, function (err) {
                      if (err) throw err;
                      convertTHATFILE();
                    });
                  }
                );
              } else {
                convertTHATFILE();
              }
            });
        });
        console.log('Final output: ', finalOutput);
        lineBreak();
        convertAlert();
      }
    }
  }
  convertTHATFILE();
}

module.exports = gifConvert;
