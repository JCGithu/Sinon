const { swalColours, lineBreak } = require('../utilities/utils.js');

//Effects
const screengrabs = require('../effects/screengrab.js');
const socialBlur = require('../effects/blur.js');
const concat = require('../effects/concat.js');
const wave = require('../effects/wave.js');

async function run_effect(targetFiles) {
  lineBreak();
  swalColours();
  var outputFile, inputFull, inputExt, inputDir, pngFolder, inputName, finalOutput;
  var e = document.getElementById('convertFormat');
  let format = e.options[e.selectedIndex].value;
  var multi = false;

  // SINGLE
  async function singleEffect(format, multi) {
    if (format.indexOf('wave') >= 0) {
      return wave(multi, swalColour, format, targetFiles);
    }
    if (format.indexOf('blur') >= 0) {
      return socialBlur(multi, swalColour, format, targetFiles);
    }
    if (format.indexOf('grabs') >= 0) {
      return screengrabs(multi, swalColour, format, targetFiles);
    }
    if (format.indexOf('concat') >= 0) {
      return concat(multi, swalColour, format, targetFiles);
    }
  }

  //CUSTOM
  if (format.indexOf('custom') >= 0) {
    Swal.fire({
      icon: 'info',
      title: 'Pick your effects',
      text: 'What effects do you want to run?',
      html:
        "<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; width:100%'>" +
        "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
        "<select id='custom_one' class='convFormat'>" +
        "<option value='concat'>Join clips</option>" +
        "<option value='blur'>Social Media Blur</option>" +
        "<option value='wave'>Generate Waveform</option>" +
        "<option value='grabs'>Get Screengrabs</option>" +
        '</select>' +
        '</div>' +
        "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
        "<select id='custom_two' class='convFormat' classNamePrefix='conv'>" +
        "<option value='blur'>Social Media Blur</option>" +
        "<option value='wave'>Generate Waveform</option>" +
        "<option value='grabs'>Get Screengrabs</option>" +
        '</select>' +
        '</div>' +
        "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
        "<select id='custom_three' class='convFormat' classNamePrefix='conv'>" +
        "<option value='blank'>N/A</option>" +
        "<option value='blur'>Social Media Blur</option>" +
        "<option value='wave'>Generate Waveform</option>" +
        "<option value='grabs'>Get Screengrabs</option>" +
        '</select>' +
        '</div>' +
        '</div>',
      confirmButtonText: 'Run!',
      showLoaderOnConfirm: true,
      backdrop: swalColour.loading,
      target: document.getElementById('swalframe'),
      preConfirm: async () => {
        formats = [
          document.getElementById('custom_one').options[document.getElementById('custom_one').selectedIndex].value,
          document.getElementById('custom_two').options[document.getElementById('custom_two').selectedIndex].value,
          document.getElementById('custom_three').options[document.getElementById('custom_three').selectedIndex].value,
        ];
        multi = true;
        console.log(formats);
        singleEffect(formats[0], multi).then((outputs) => {
          if (formats[2] == 'blank') {
            multi = false;
          }
          targetFiles = outputs;
          singleEffect(formats[1], multi).then((outputs) => {
            if (formats[2] !== 'blank') {
              multi = false;
              targetFiles = outputs;
              singleEffect(formats[2], multi);
            }
          });
        });
      },
    });
  } else {
    await singleEffect(format, multi);
  }
}

module.exports = run_effect;
