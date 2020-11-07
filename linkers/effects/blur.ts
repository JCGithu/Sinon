import Swal,{ SweetAlertOptions } from 'sweetalert2';

import { remote, win, lineBreak } from '../Utilities/utils';

import { convertAlert } from '../alerts/convertAlert';
import { errorAlert } from '../alerts/errorAlert';
import { successAlert } from '../alerts/successAlert';

async function socialBlur (multi, swalColour, format){
    return new Promise ((resolve) => {
        Swal.fire({
            icon: 'info',
            title: "Which ratio!",
            text: "What ratio is the original video?",
            input: 'select',
            inputOptions: {
                vertical: 'Vertical (9x16)',
                square: 'Square (1x1)',
            },
            inputPlaceholder: 'Select Ratio',
            confirmButtonText: 'Run!',
            showLoaderOnConfirm: true,
            backdrop: swalColour.loading,
            target: document.getElementById('swalframe'),
            preConfirm: (ratio) => {
                convertAlert(swalColour);
                if (ratio === 'vertical') {
                    var cropSetting = '[pxratio_fix]crop=w=ih*(9/16)[cropped]';
                }
                if (ratio === 'square') {
                    var cropSetting = "[pxratio_fix]crop='if(lt(in_h,in_w),in_h,in_w):in_h'[cropped]";
                }
                effectFile.forEach(function(fileSelected: any){
                    let fileSettings = effectSetUp(fileSelected);
                    var finalOutput = fileSettings.outputFile + '-bgblurred.mp4';
                    console.log('Final output: ', finalOutput);
                    lineBreak();
                    ffmpeg(fileSelected)
                    .complexFilter([
                        '[0:v]scale=iw*sar:ih[pxratio_fix]',
                        cropSetting,
                        '[cropped]boxblur=20:10[blurred]',
                        '[0:v]scale=iw*sar:ih[pxratio_fix]',
                        cropSetting,
                        '[cropped]scale=-1:1080[original]',
                        '[blurred]scale=1920:-1[scaledbg]',
                        '[scaledbg]crop=1920:1080[bg]',
                        '[bg][original]overlay=(W-w)/2:(H-h)/2,crop=h=iw*9/16[end]'
                    ], 'end')
                    .format('mp4')
                    .outputOptions([
                        '-map 0:a?',
                    ])
                    .on('progress', function(progress: { percent: number; timemark: any; }) {
                        if (progress.percent === undefined){
                            document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
                        }
                        else {
                            document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                            let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                            win.setProgressBar(percentage);
                            console.log('Processing: ' + progress.percent + '% done');
                        }
                    })
                    .on('error', function(err: any, stdout: any, stderr: any) {
                        errorAlert('', 'effect', err, swalColour, '');
                    })
                    .save(finalOutput).on('end', function(stdout: any, stderr: any) {
                        console.log('Conversion Success!');
                        resolve();
                        win.setProgressBar(-1)
                        if (multi == false) {
                            successAlert('effect', 'Social blur applied', swalColour);
                        }
                    });
                }
            )}
        });
    });
}


module.exports = {
    socialBlur
}
