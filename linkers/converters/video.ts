const { convertAlert } = require('../alerts/convertAlert');
const { errorAlert } = require('../alerts/errorAlert');

import Swal  from 'sweetalert2';

async function videoConvert(convertInfo, swalColour){
    Swal.fire({
        icon: 'info',
        title: "File format",
        text: "What format of video would you like to convert to?",
        input: 'select',
        inputOptions: {
            mp4: '.mp4',
            mov: '.mov',
            avi: '.avi',
            webm: '.webm',
        },
        confirmButtonText: 'Run!',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        target: document.getElementById('swalframe'),
        preConfirm: (videoForm) => {
            let videoFormCap = videoForm.toUpperCase();
            let finalOutput = convertInfo. outputFile + '.' + videoForm;
            if (convertInfo.inputExt.indexOf('.' + videoForm)>=0 || convertInfo.inputExt.indexOf('.' + videoFormCap)>=0){
                finalOutput = convertInfo.outputFile + '-SinonConverted.' + videoForm;
            }
            console.log('Final output: ', finalOutput)
            lineBreak();

            Swal.fire({
                icon: 'info',
                title: "Convert, how?",
                text: "Remuxing is significantly faster for some formats (MKV, MOV, etc), however may lose additional audio and subtitle tracks",
                input: 'select',
                inputOptions: {
                    convert: 'Convert',
                    remux: 'Remux',
                },
                confirmButtonText: 'Run!',
                showLoaderOnConfirm: true,
                backdrop: swalColour.Loading,
                target: document.getElementById('swalframe'),
                preConfirm: (videoConv) => {
                    convertAlert(swalColour);
                    if (videoConv == 'convert'){
                        var runMP4 = ffmpeg(convertInfo.file).format(videoForm).on('progress', function(progress) {progressBar(progress, '')}).save(finalOutput);
                    } else {
                        var runMP4 = ffmpeg(convertInfo.file).videoCodec('copy').audioCodec('aac').outputOptions([
                            '-map 0:v', '-map 0:a:?',
                        ]).output(finalOutput).on('progress', function(progress) {progressBar(progress, '')})
                    }
                    runMP4.on('error', function(err, stdout, stderr) {
                        err = err + stdout + stderr;
                        errorAlert(err, 'convert', swalColour);
                    });
                    runMP4.on('end', function() {
                        successAlert('convert', '', swalColour);
                    }).run();
                    console.log(videoForm + ' running');
                }
            });
        }
    });
}


module.exports = {
    videoConvert
}