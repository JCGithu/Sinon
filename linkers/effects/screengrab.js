import { effectSetUp } from '../Utilities/fileSetUp.js';

import { successAlert } from '../alerts/successAlert.js';
import { convertAlert } from '../alerts/convertAlert.js';
import { errorAlert } from '../alerts/errorAlert.js';

export async function screengrabs (multi, swalColour, format, targetFiles){
    return new Promise ((resolve) => {
        Swal.fire({
            icon: 'info',
            title: "How many?",
            text: "Pick a number, any number",
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
                targetFiles.forEach(function(fileSelected){
                    let fileSettings = effectSetUp(fileSelected);
                    ffmpeg(fileSelected).screenshots({
                        count: grabNum,
                        folder: fileSettings.inputDir,
                        filename: fileSettings.inputName + '-%d.png',
                    })
                    .on('error', function(err) {
                        errorAlert('', 'effect', err, swalColour, '');
                    })
                    .on('end', function() {
                        console.log('Conversion Success!');
                        resolve();
                        if (multi == false) {
                            successAlert('effect', 'Screenshots taken', swalColour);
                        }
                    });
                });
            }
        })
    });
}
