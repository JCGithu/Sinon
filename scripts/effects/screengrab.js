const fileSetUp = require('../utilities/fileSetUp.js');

const successAlert = require('../alerts/successAlert.js');
const convertAlert = require('../alerts/convertAlert.js');
const errorAlert = require('../alerts/errorAlert.js');

async function screengrabs(multi, swalColour, format, targetFiles) {
  return new Promise((resolve) => {
    Swal.fire({
      icon: 'info',
      title: 'How many?',
      text: 'Pick a number, any number',
      input: 'range',
      inputAttributes: {
        min: 1,
        max: 20,
        step: 1,
      },
      inputValue: 1,
      confirmButtonText: 'Grab!',
      showLoaderOnConfirm: true,
      backdrop: swalColour.loading,
      target: document.getElementById('swalframe'),
      preConfirm: (grabNum) => {
        convertAlert(swalColour);
        numberGen(grabNum).then((stages)=>{
          targetFiles.forEach(function (fileSelected) {
            let fileSettings = fileSetUp(fileSelected);
            console.log(stages);
            ffmpeg(fileSelected)
              .screenshots({
                timestamps: stages,
                folder: fileSettings.inputDir,
                filename: fileSettings.inputName + '-%d.png',
              })
              .on('error', function (err) {
                errorAlert('', 'effect', err);
              })
              .on('end', function () {
                console.log('Conversion Success!');
                resolve();
                if (multi == false) {
                  successAlert('effect', 'Screenshots taken');
                }
              });
          });
        });
      },
    });
  });
}

function numberGen(grabNum){
  let array = []
  return new Promise((resolve) => {
    for (let i =0; i <= grabNum; i++ ){
      let percent = Math.floor((100/grabNum) * i)
      array.push(`${percent}%`)
      if (i == grabNum){
        resolve(array)
      }
    }
  })
}

module.exports = screengrabs;
