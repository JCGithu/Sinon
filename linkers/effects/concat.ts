const { version } = require("process");

import { remote, win, progressBar, lineBreak } from '../Utilities/utils';

import { convertAlert } from '../alerts/convertAlert';
import { errorAlert } from '../alerts/errorAlert';
import { successAlert } from '../alerts/successAlert';

async function concat(multi, swalColour, format){
    return new Promise ((resolve) => {
        let ffmpegInputs = ffmpeg();
        let fileSettings;
        var getInputs = new Promise((resolve) => {
            effectFile.forEach(async function(fileSelected: any, index: number, array: string | any[]){
                fileSettings = effectSetUp(fileSelected);
                ffmpegInputs = ffmpegInputs.input(fileSettings.inputFull);
                if (index === array.length -1) resolve();
                return ffmpegInputs
            });
        });
        getInputs.then(() => {
            lineBreak();
            convertAlert(swalColour);
            console.log(ffmpegInputs);
            var finalOutput = fileSettings.outputFile + '-Sinon-Joined.mp4'
            ffmpegInputs
                .on('progress', function(progress: any) {
                    progressBar(progress, format);
                })
                .on('error', function(err: any, stdout: any, stderr: any) {
                    errorAlert('', 'effect', err, swalColour, '');
                })
                .mergeToFile(finalOutput)
                .outputOptions([
                    '-map 0:a?',
                ])
                .on('end', function(stdout: any, stderr: any) {
                    console.log('Merge Success!');
                    win.setProgressBar(-1);
                    resolve('Concat finished');
                    if (multi == false) {
                        successAlert('effect', 'Clips merged', swalColour);
                    }
                })
        });
    });
};

module.exports = {
    concat
}