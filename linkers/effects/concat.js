import { progressBar, lineBreak } from '../Utilities/utils.js';
import { effectSetUp } from '../Utilities/fileSetUp.js';

import { convertAlert } from '../alerts/convertAlert.js';
import { errorAlert } from '../alerts/errorAlert.js';
import { successAlert } from '../alerts/successAlert.js';

export async function concat(multi, swalColour, format, targetFiles){
    return new Promise ((resolve) => {
        let ffmpegInputs = ffmpeg();
        let fileSettings;
        var getInputs = new Promise((resolve) => {
            targetFiles.forEach(async function(fileSelected, index, array){
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
                .on('progress', function(progress) {
                    progressBar(progress, format);
                })
                .on('error', function(err) {
                    errorAlert('', 'effect', err, swalColour, '');
                })
                .mergeToFile(finalOutput)
                .outputOptions([
                    '-map 0:a?',
                ])
                .on('end', function() {
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