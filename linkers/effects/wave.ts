import Swal,{ SweetAlertOptions } from 'sweetalert2';

const { convertAlert } = require('../alerts/convertAlert');
const { errorAlert } = require('../alerts/errorAlert');

async function wave(multi, swalColour, format){
    return new Promise ((resolve, reject) => {
        effectFile.forEach(function(fileSelected: any){
            let fileSettings = effectSetUp(fileSelected);
            var finalOutput = fileSettings.outputFile + '-waveform.mov'
            console.log('Final output: ', finalOutput)
            lineBreak();
            convertAlert(swalColour);
            ffmpeg(fileSelected)
            .fps(25)
            .format('mov')
            .videoCodec('png')
            .complexFilter(['aformat=channel_layouts=mono,compand=attacks=0:points=-80/-115|-35.1/-80|-35/-35|20/20=gain=-6,showwaves=s=2000x720:mode=cline:r=25:colors=#ffffff,format=yuva420p,colorkey=0x000000:0.1:0.5[v]'],'v')
            .outputOptions([
                '-map 0:a',
            ]).on('progress', function(progress: { percent: number; timemark: any; }) {
                if (progress.percent === undefined){
                    document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
                } else {
                    document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                    console.log('Processing: ' + progress.percent + '% done');
                    let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                    win.setProgressBar(percentage);
                }
            })
            .on('error', function(err: any, stdout: any, stderr: any) {
                errorAlert('', 'effect', err, swalColour);
            })
            .save(finalOutput).on('end', function(stdout: any, stderr: any) {
                console.log('Conversion Success!');
                resolve();
                if (multi == false) {
                    successAlert('effect', 'Wave created!', swalColour);
                    win.setProgressBar(-1)
                }
            });
        })
    });
}

module.exports = {
    wave
}