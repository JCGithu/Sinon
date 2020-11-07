import Swal  from 'sweetalert2';

import { remote, win, lineBreak } from '../Utilities/utils';
import { successAlert } from '../alerts/successAlert';
import { convertAlert } from '../alerts/convertAlert';
import { errorAlert } from '../alerts/errorAlert';

async function audioConvert(convertInfo, swalColour){
    Swal.fire({
        icon: 'info',
        title: "File format",
        text: "What format of audio would you like to convert to?",
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
            let audioFormCap = audioForm.toUpperCase();
            let finalOutput = convertInfo.outputFile + '.' + audioForm;
            if (convertInfo.inputExt.indexOf('.' + audioForm)>=0 || convertInfo.inputExt.indexOf('.' + audioFormCap)>=0){
                finalOutput = convertInfo.outputFile + '-SinonConverted.' + audioForm;
            }
            console.log('Final output: ', finalOutput);
            lineBreak();
            convertAlert(swalColour);
            ffmpeg(convertInfo.file).format(audioForm).noVideo().on('progress', function(progress) {
                document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                console.log('Processing: ' + progress.percent + '% done');
                let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                win.setProgressBar(percentage);
            }).on('error', function (err, stdout, stderr) {
                err = err + stdout + stderr;
                errorAlert(err, 'convert', '', swalColour, '');
            }).save(finalOutput).on('end', function(stdout, stderr) {
                successAlert('convert', '', swalColour);
            });
            console.log(audioForm + ' running');
        }
    });
};

module.exports = {
    audioConvert
}